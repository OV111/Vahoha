import re


def parse_bearer(header):
    if not isinstance(header, str):
        return None
    match = re.fullmatch(r"Bearer +([A-Za-z0-9\-._~+/]+=*)", header.strip(), re.IGNORECASE)
    return match.group(1) if match else None
