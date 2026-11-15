class Solution {
public:
    vector<string> splitArgs(string cmd) {
        vector<string> args;
        string current;
        bool inToken = false;
        char quote = 0;
        for (size_t i = 0; i < cmd.size(); i++) {
            char c = cmd[i];
            if (quote) {
                if (c == quote) {
                    quote = 0;
                } else if (c == '\\' && quote == '"' && i + 1 < cmd.size() && (cmd[i + 1] == '"' || cmd[i + 1] == '\\')) {
                    current += cmd[++i];
                } else {
                    current += c;
                }
            } else if (c == '"' || c == '\'') {
                quote = c;
                inToken = true;
            } else if (c == '\\' && i + 1 < cmd.size()) {
                current += cmd[++i];
                inToken = true;
            } else if (isspace((unsigned char) c)) {
                if (inToken) {
                    args.push_back(current);
                    current.clear();
                    inToken = false;
                }
            } else {
                current += c;
                inToken = true;
            }
        }
        if (quote) throw invalid_argument("Unclosed quote");
        if (inToken) args.push_back(current);
        return args;
    }
};
