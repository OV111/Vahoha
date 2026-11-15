#!/usr/bin/env bash
# Sets up Judge0 on a fresh Ubuntu 22.04 or 24.04 server. Run as root:
#
#   bash setup.sh judge.example.com
#
# Safe to run again. The first run may switch the kernel to cgroup v1 and ask
# for a reboot; run it again after the reboot.

set -euo pipefail

DOMAIN="${1:?usage: bash setup.sh <domain pointing at this server>}"
JUDGE0_VERSION="1.13.1"
DIR="$(cd "$(dirname "$0")" && pwd)"

# Judge0 1.13's sandbox (isolate) only works with cgroup v1. Ubuntu 22.04+
# boots with cgroup v2, so switch it once and reboot.
if [ "$(stat -fc %T /sys/fs/cgroup/)" = "cgroup2fs" ]; then
  if ! grep -q "systemd.unified_cgroup_hierarchy=0" /etc/default/grub; then
    sed -i 's/^GRUB_CMDLINE_LINUX="/GRUB_CMDLINE_LINUX="systemd.unified_cgroup_hierarchy=0 /' /etc/default/grub
    update-grub
  fi
  echo "Switched to cgroup v1. Reboot (sudo reboot), then run this script again."
  exit 0
fi

if ! command -v docker >/dev/null; then
  curl -fsSL https://get.docker.com | sh
fi

# Only SSH and the web ports are open.
if command -v ufw >/dev/null; then
  ufw allow OpenSSH
  ufw allow 80/tcp
  ufw allow 443/tcp
  ufw --force enable
fi

cd "$DIR"

# judge0.conf comes from the official release, with the secrets filled in.
# It is created once; later runs keep the existing passwords and token.
if [ ! -f judge0.conf ]; then
  apt-get install -y unzip >/dev/null
  tmp="$(mktemp -d)"
  curl -fsSL -o "$tmp/judge0.zip" \
    "https://github.com/judge0/judge0/releases/download/v${JUDGE0_VERSION}/judge0-v${JUDGE0_VERSION}.zip"
  unzip -q "$tmp/judge0.zip" -d "$tmp"
  cp "$tmp/judge0-v${JUDGE0_VERSION}/judge0.conf" judge0.conf
  rm -rf "$tmp"

  secret() { openssl rand -hex 32; }
  sed -i "s/^REDIS_PASSWORD=.*/REDIS_PASSWORD=$(secret)/" judge0.conf
  sed -i "s/^POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$(secret)/" judge0.conf
  sed -i "s/^AUTHN_TOKEN=.*/AUTHN_TOKEN=$(secret)/" judge0.conf
  chmod 600 judge0.conf
fi

echo "JUDGE0_DOMAIN=${DOMAIN}" > .env

# The database and Redis first, so the API finds them ready.
docker compose up -d db redis
sleep 10
docker compose up -d

token="$(grep '^AUTHN_TOKEN=' judge0.conf | cut -d= -f2)"
echo
echo "Judge0 is starting at https://${DOMAIN} (the certificate can take a minute)."
echo "Set these on the Render API service:"
echo "  JUDGE0_URL=https://${DOMAIN}"
echo "  JUDGE0_AUTH_TOKEN=${token}"
