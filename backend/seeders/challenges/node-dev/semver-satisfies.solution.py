import re

VERSION = re.compile(r"(\d+)\.(\d+)\.(\d+)(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?", re.ASCII)
OPERATOR = re.compile(r"\^|~|>=|<=|>|<|=")
WILDCARDS = {"", "x", "X", "*"}


def parse_partial(text):
    parts = text.split(".")
    if len(parts) > 3:
        raise ValueError("Invalid range: " + text)
    nums = []
    for part in parts:
        if part in WILDCARDS:
            break
        if not re.fullmatch(r"\d+", part, re.ASCII):
            raise ValueError("Invalid range: " + text)
        nums.append(int(part))
    return nums


def comparator(token):
    match = OPERATOR.match(token)
    op = match.group(0) if match else ""
    nums = parse_partial(token[len(op):])
    if not nums:
        return lambda v: True
    lo = (nums + [0, 0, 0])[:3]

    if op == "^":
        if nums[0] > 0 or len(nums) == 1:
            hi = [nums[0] + 1, 0, 0]
        elif nums[1] > 0 or len(nums) == 2:
            hi = [0, nums[1] + 1, 0]
        else:
            hi = [0, 0, nums[2] + 1]
        return lambda v: lo <= v < hi
    if op in ("~", "", "="):
        if len(nums) == 3 and op != "~":
            return lambda v: v == lo
        hi = [nums[0] + 1, 0, 0] if len(nums) == 1 else [nums[0], nums[1] + 1, 0]
        return lambda v: lo <= v < hi
    if len(nums) != 3:
        raise ValueError("Operator " + op + " needs a full version: " + token)
    if op == ">=":
        return lambda v: v >= lo
    if op == "<=":
        return lambda v: v <= lo
    if op == ">":
        return lambda v: v > lo
    return lambda v: v < lo


def satisfies(version, range):
    match = VERSION.fullmatch(version)
    if not match:
        raise ValueError("Invalid version: " + version)
    if match.group(4):
        return False
    v = [int(match.group(i)) for i in (1, 2, 3)]
    return any(
        all(comparator(token)(v) for token in alternative.split())
        for alternative in range.split("||")
    )
