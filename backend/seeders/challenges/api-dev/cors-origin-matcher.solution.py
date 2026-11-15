import re

LABELS = re.compile(r"[a-z0-9-]+(\.[a-z0-9-]+)*", re.IGNORECASE)


def is_origin_allowed(origin, allow_list):
    if not isinstance(origin, str) or origin == "":
        return False
    for entry in allow_list:
        if entry == "*":
            return True
        star = entry.find("*.")
        if star == -1:
            if entry == origin:
                return True
            continue
        prefix, suffix = entry[:star], entry[star + 1:]
        if len(origin) < len(prefix) + len(suffix):
            continue
        if origin.startswith(prefix) and origin.endswith(suffix):
            if LABELS.fullmatch(origin[len(prefix):len(origin) - len(suffix)]):
                return True
    return False
