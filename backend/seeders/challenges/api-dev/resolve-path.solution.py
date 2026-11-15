def resolve_path(cwd, target, home="/home/user"):
    path = target
    if path == "~" or path.startswith("~/"):
        path = home + path[1:]
    if not path.startswith("/"):
        path = cwd + "/" + path
    parts = []
    for segment in path.split("/"):
        if segment in ("", "."):
            continue
        if segment == "..":
            if parts:
                parts.pop()
        else:
            parts.append(segment)
    return "/" + "/".join(parts)
