func splitArgs(cmd string) []string {
	args := []string{}
	current := []byte{}
	inToken := false
	var quote byte
	for i := 0; i < len(cmd); i++ {
		c := cmd[i]
		switch {
		case quote != 0:
			if c == quote {
				quote = 0
			} else if c == '\\' && quote == '"' && i+1 < len(cmd) && (cmd[i+1] == '"' || cmd[i+1] == '\\') {
				i++
				current = append(current, cmd[i])
			} else {
				current = append(current, c)
			}
		case c == '"' || c == '\'':
			quote = c
			inToken = true
		case c == '\\' && i+1 < len(cmd):
			i++
			current = append(current, cmd[i])
			inToken = true
		case c == ' ' || c == '\t' || c == '\n' || c == '\r' || c == '\v' || c == '\f':
			if inToken {
				args = append(args, string(current))
				current = current[:0]
				inToken = false
			}
		default:
			current = append(current, c)
			inToken = true
		}
	}
	if quote != 0 {
		panic("Unclosed quote")
	}
	if inToken {
		args = append(args, string(current))
	}
	return args
}
