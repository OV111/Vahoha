import "strings"

// One or more labels of letters, digits and '-', joined by single dots.
func isLabels(s string) bool {
	labelStarted := false
	for i := 0; i < len(s); i++ {
		c := s[i]
		switch {
		case c == '.':
			if !labelStarted {
				return false
			}
			labelStarted = false
		case c >= 'a' && c <= 'z', c >= 'A' && c <= 'Z', c >= '0' && c <= '9', c == '-':
			labelStarted = true
		default:
			return false
		}
	}
	return labelStarted
}

func isOriginAllowed(origin string, allowList []string) bool {
	if origin == "" {
		return false
	}
	for _, entry := range allowList {
		if entry == "*" {
			return true
		}
		star := strings.Index(entry, "*.")
		if star == -1 {
			if entry == origin {
				return true
			}
			continue
		}
		prefix, suffix := entry[:star], entry[star+1:]
		if len(origin) < len(prefix)+len(suffix) || !strings.HasPrefix(origin, prefix) || !strings.HasSuffix(origin, suffix) {
			continue
		}
		if isLabels(origin[len(prefix) : len(origin)-len(suffix)]) {
			return true
		}
	}
	return false
}
