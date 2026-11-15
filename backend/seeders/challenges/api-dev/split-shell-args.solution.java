import java.util.*;

class Solution {
    public String[] splitArgs(String cmd) {
        List<String> args = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inToken = false;
        char quote = 0;
        for (int i = 0; i < cmd.length(); i++) {
            char c = cmd.charAt(i);
            if (quote != 0) {
                if (c == quote) {
                    quote = 0;
                } else if (c == '\\' && quote == '"' && i + 1 < cmd.length()
                        && (cmd.charAt(i + 1) == '"' || cmd.charAt(i + 1) == '\\')) {
                    current.append(cmd.charAt(++i));
                } else {
                    current.append(c);
                }
            } else if (c == '"' || c == '\'') {
                quote = c;
                inToken = true;
            } else if (c == '\\' && i + 1 < cmd.length()) {
                current.append(cmd.charAt(++i));
                inToken = true;
            } else if (Character.isWhitespace(c)) {
                if (inToken) {
                    args.add(current.toString());
                    current.setLength(0);
                    inToken = false;
                }
            } else {
                current.append(c);
                inToken = true;
            }
        }
        if (quote != 0) throw new IllegalArgumentException("Unclosed quote");
        if (inToken) args.add(current.toString());
        return args.toArray(new String[0]);
    }
}
