import re


def octal_to_symbolic(mode):
    text = "" if mode is None else str(mode)
    if not re.fullmatch(r"[0-7]{3}", text):
        return None
    return "".join(
        ("r" if d & 4 else "-") + ("w" if d & 2 else "-") + ("x" if d & 1 else "-")
        for d in map(int, text)
    )
