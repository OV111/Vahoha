import re

PATTERN = re.compile(r"\$(\$|\{([A-Za-z_][A-Za-z0-9_]*)(?:(:?[-?])([^}]*))?\})")


def interpolate(template, env):
    def expand(match):
        if match.group(1) == "$":
            return "$"
        name, op, arg = match.group(2), match.group(3), match.group(4)
        value = env.get(name)
        unset = value is None
        empty = unset or value == ""
        if op == ":-":
            return arg if empty else value
        if op == "-":
            return arg if unset else value
        if op in (":?", "?"):
            if empty if op == ":?" else unset:
                raise ValueError(arg or name + " is required")
            return value
        return "" if unset else value

    return PATTERN.sub(expand, template)
