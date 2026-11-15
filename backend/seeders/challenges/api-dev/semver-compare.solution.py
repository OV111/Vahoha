import re

VERSION = re.compile(r"(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?", re.ASCII)


def parse(version):
    match = VERSION.fullmatch(version)
    if not match:
        raise ValueError("Invalid version: " + version)
    nums = [int(match.group(i)) for i in (1, 2, 3)]
    pre = match.group(4).split(".") if match.group(4) else []
    return nums, pre


def compare_semver(a, b):
    x_nums, x_pre = parse(a)
    y_nums, y_pre = parse(b)
    if x_nums != y_nums:
        return -1 if x_nums < y_nums else 1
    if not x_pre and not y_pre:
        return 0
    if not x_pre:
        return 1
    if not y_pre:
        return -1
    for p, q in zip(x_pre, y_pre):
        p_num, q_num = p.isdigit(), q.isdigit()
        if p_num and q_num:
            if int(p) != int(q):
                return -1 if int(p) < int(q) else 1
        elif p_num:
            return -1
        elif q_num:
            return 1
        elif p != q:
            return -1 if p < q else 1
    if len(x_pre) == len(y_pre):
        return 0
    return -1 if len(x_pre) < len(y_pre) else 1
