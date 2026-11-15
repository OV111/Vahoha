def split_args(cmd):
    args = []
    current = ""
    in_token = False
    quote = None
    i = 0
    while i < len(cmd):
        c = cmd[i]
        if quote:
            if c == quote:
                quote = None
            elif c == "\\" and quote == '"' and i + 1 < len(cmd) and cmd[i + 1] in '"\\':
                i += 1
                current += cmd[i]
            else:
                current += c
        elif c in "\"'":
            quote = c
            in_token = True
        elif c == "\\" and i + 1 < len(cmd):
            i += 1
            current += cmd[i]
            in_token = True
        elif c.isspace():
            if in_token:
                args.append(current)
                current = ""
                in_token = False
        else:
            current += c
            in_token = True
        i += 1
    if quote:
        raise ValueError("Unclosed quote")
    if in_token:
        args.append(current)
    return args
