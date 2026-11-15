class Solution {
    static bool isNumber(const string& s) {
        return !s.empty() && all_of(s.begin(), s.end(), [](unsigned char c) { return isdigit(c) != 0; });
    }

    static bool isIdentifier(const string& s) {
        return !s.empty() && all_of(s.begin(), s.end(), [](unsigned char c) { return isalnum(c) || c == '.' || c == '-'; });
    }

    static vector<string> split(const string& s, char sep) {
        vector<string> parts;
        size_t start = 0;
        while (true) {
            size_t at = s.find(sep, start);
            parts.push_back(s.substr(start, at == string::npos ? string::npos : at - start));
            if (at == string::npos) return parts;
            start = at + 1;
        }
    }

    // MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]: the numbers and the prerelease identifiers.
    static pair<vector<long long>, vector<string>> parse(const string& version) {
        invalid_argument invalid("Invalid version: " + version);
        string rest = version;
        size_t plus = rest.find('+');
        if (plus != string::npos) {
            if (!isIdentifier(rest.substr(plus + 1))) throw invalid;
            rest = rest.substr(0, plus);
        }
        vector<string> pre;
        size_t dash = rest.find('-');
        if (dash != string::npos) {
            string text = rest.substr(dash + 1);
            if (!isIdentifier(text)) throw invalid;
            pre = split(text, '.');
            rest = rest.substr(0, dash);
        }
        vector<string> core = split(rest, '.');
        if (core.size() != 3) throw invalid;
        vector<long long> nums;
        for (const string& part : core) {
            if (!isNumber(part)) throw invalid;
            nums.push_back(stoll(part));
        }
        return make_pair(nums, pre);
    }

public:
    int compareSemver(string a, string b) {
        pair<vector<long long>, vector<string>> x = parse(a);
        pair<vector<long long>, vector<string>> y = parse(b);
        for (int i = 0; i < 3; i++) {
            if (x.first[i] != y.first[i]) return x.first[i] < y.first[i] ? -1 : 1;
        }
        const vector<string>& p = x.second;
        const vector<string>& q = y.second;
        if (p.empty() && q.empty()) return 0;
        if (p.empty()) return 1;
        if (q.empty()) return -1;
        for (size_t i = 0; i < min(p.size(), q.size()); i++) {
            bool pNum = isNumber(p[i]);
            bool qNum = isNumber(q[i]);
            if (pNum && qNum) {
                long long m = stoll(p[i]), n = stoll(q[i]);
                if (m != n) return m < n ? -1 : 1;
            } else if (pNum) {
                return -1;
            } else if (qNum) {
                return 1;
            } else if (p[i] != q[i]) {
                return p[i] < q[i] ? -1 : 1;
            }
        }
        if (p.size() == q.size()) return 0;
        return p.size() < q.size() ? -1 : 1;
    }
};
