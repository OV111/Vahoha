# Judge0 server

Runs challenge submissions in Python, Ruby, PHP, Java, C++ and Go. JavaScript
and TypeScript never come here; they run in the API's own sandbox.

Render can't host this: Judge0 needs privileged Docker containers and cgroup v1.
It runs on its own small VM (2 vCPU / 4 GB is enough to start, e.g. Hetzner CX22).

## Set up

1. Create an Ubuntu 22.04 or 24.04 server.
2. Point a DNS A record (e.g. `judge.<your domain>`) at its IP.
3. Copy this folder to the server and run it as root:

   ```sh
   scp -r deploy/judge0 root@<ip>:/opt/judge0
   ssh root@<ip> bash /opt/judge0/setup.sh judge.<your domain>
   ```

   The first run switches the kernel to cgroup v1 and asks for a reboot. Reboot,
   then run the same command again.
4. The script prints `JUDGE0_URL` and `JUDGE0_AUTH_TOKEN`. Set both on the Render
   API service and redeploy it.

Until `JUDGE0_URL` is set, the API offers only JavaScript and TypeScript on
challenges that have them. Challenges written for one judge language alone
answer "temporarily unavailable" when submitted.

## Check it

```sh
curl -H "X-Auth-Token: <token>" https://judge.<your domain>/languages
JUDGE0_URL=https://judge.<your domain> JUDGE0_AUTH_TOKEN=<token> npm run challenges:verify -- api-dev
```

## What it runs

The `judge0/judge0:1.13.1` image ships older compilers than the public
ce.judge0.com: Python 3.8, Ruby 2.7, PHP 7.4, Java 13, GCC 9 (C++14 by default)
and Go 1.13. Reference solutions and harnesses must stay within those versions:
no Python `match`, PHP 8 functions such as `str_starts_with`, C++17 structured
bindings or Go generics.

## Operate

- Logs: `docker compose logs -f server workers` in `/opt/judge0`
- Update the OS: `apt upgrade`, then `reboot`; the containers restart on their own
- `judge0.conf` holds the passwords and the token. Keep it on the server only;
  it is not in git.
