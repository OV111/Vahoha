import (
	"strconv"
	"strings"
)

func isDigits(s string) bool {
	if s == "" {
		return false
	}
	for i := 0; i < len(s); i++ {
		if s[i] < '0' || s[i] > '9' {
			return false
		}
	}
	return true
}

func isIdentifier(s string) bool {
	if s == "" {
		return false
	}
	for i := 0; i < len(s); i++ {
		c := s[i]
		if !(c >= '0' && c <= '9' || c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c == '.' || c == '-') {
			return false
		}
	}
	return true
}

// MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]: the numbers and the prerelease identifiers.
func parseSemver(version string) ([3]int, []string) {
	invalid := "Invalid version: " + version
	rest := version
	if plus := strings.IndexByte(rest, '+'); plus != -1 {
		if !isIdentifier(rest[plus+1:]) {
			panic(invalid)
		}
		rest = rest[:plus]
	}
	var pre []string
	if dash := strings.IndexByte(rest, '-'); dash != -1 {
		if !isIdentifier(rest[dash+1:]) {
			panic(invalid)
		}
		pre = strings.Split(rest[dash+1:], ".")
		rest = rest[:dash]
	}
	core := strings.Split(rest, ".")
	if len(core) != 3 {
		panic(invalid)
	}
	var nums [3]int
	for i, part := range core {
		if !isDigits(part) {
			panic(invalid)
		}
		nums[i], _ = strconv.Atoi(part)
	}
	return nums, pre
}

func compareSemver(a string, b string) int {
	xNums, p := parseSemver(a)
	yNums, q := parseSemver(b)
	for i := 0; i < 3; i++ {
		if xNums[i] != yNums[i] {
			if xNums[i] < yNums[i] {
				return -1
			}
			return 1
		}
	}
	if len(p) == 0 && len(q) == 0 {
		return 0
	}
	if len(p) == 0 {
		return 1
	}
	if len(q) == 0 {
		return -1
	}
	for i := 0; i < len(p) && i < len(q); i++ {
		pNum, qNum := isDigits(p[i]), isDigits(q[i])
		switch {
		case pNum && qNum:
			m, _ := strconv.Atoi(p[i])
			n, _ := strconv.Atoi(q[i])
			if m != n {
				if m < n {
					return -1
				}
				return 1
			}
		case pNum:
			return -1
		case qNum:
			return 1
		case p[i] != q[i]:
			if p[i] < q[i] {
				return -1
			}
			return 1
		}
	}
	switch {
	case len(p) < len(q):
		return -1
	case len(p) > len(q):
		return 1
	}
	return 0
}
