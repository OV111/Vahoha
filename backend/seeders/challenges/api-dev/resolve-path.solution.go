import "strings"

func resolvePath(cwd string, target string, home string) string {
	path := target
	if path == "~" || strings.HasPrefix(path, "~/") {
		path = home + path[1:]
	}
	if !strings.HasPrefix(path, "/") {
		path = cwd + "/" + path
	}
	parts := []string{}
	for _, segment := range strings.Split(path, "/") {
		switch segment {
		case "", ".":
		case "..":
			if len(parts) > 0 {
				parts = parts[:len(parts)-1]
			}
		default:
			parts = append(parts, segment)
		}
	}
	return "/" + strings.Join(parts, "/")
}
