class Solution {
public:
    string resolvePath(string cwd, string target, string home) {
        string path = target;
        if (path == "~" || path.rfind("~/", 0) == 0) path = home + path.substr(1);
        if (path.empty() || path[0] != '/') path = cwd + "/" + path;
        vector<string> parts;
        string segment;
        stringstream stream(path);
        while (getline(stream, segment, '/')) {
            if (segment.empty() || segment == ".") continue;
            if (segment == "..") {
                if (!parts.empty()) parts.pop_back();
            } else {
                parts.push_back(segment);
            }
        }
        string result;
        for (const string& part : parts) result += "/" + part;
        return result.empty() ? "/" : result;
    }
};
