class Solution {
    // One or more labels of letters, digits and '-', joined by single dots.
    static bool isLabels(const string& s) {
        bool labelStarted = false;
        for (char c : s) {
            if (c == '.') {
                if (!labelStarted) return false;
                labelStarted = false;
            } else if (isalnum((unsigned char) c) || c == '-') {
                labelStarted = true;
            } else {
                return false;
            }
        }
        return labelStarted;
    }

public:
    bool isOriginAllowed(string origin, vector<string>& allowList) {
        if (origin.empty()) return false;
        for (const string& entry : allowList) {
            if (entry == "*") return true;
            size_t star = entry.find("*.");
            if (star == string::npos) {
                if (entry == origin) return true;
                continue;
            }
            string prefix = entry.substr(0, star);
            string suffix = entry.substr(star + 1);
            if (origin.size() < prefix.size() + suffix.size()) continue;
            if (origin.compare(0, prefix.size(), prefix) != 0) continue;
            if (origin.compare(origin.size() - suffix.size(), suffix.size(), suffix) != 0) continue;
            if (isLabels(origin.substr(prefix.size(), origin.size() - prefix.size() - suffix.size()))) return true;
        }
        return false;
    }
};
