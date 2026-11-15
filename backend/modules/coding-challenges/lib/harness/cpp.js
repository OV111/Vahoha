// C++ harness: the standard headers, the learner's `class Solution`, then a
// main() that calls the method once per hidden case and prints the report.

import { typeIn } from "../../../../../constants/challengeTypes.js";
import { literal } from "./literals.js";
import { REPORT_MARKER } from "./report.js";

// "#line 1" makes compiler errors point at the learner's own line numbers.
const PREFIX = `#include <bits/stdc++.h>
using namespace std;
#line 1 "solution.cpp"
`;

// String.raw keeps every backslash as written, so this is exactly the C++.
const HELPERS = String.raw`
#line 1 "harness.cpp"
namespace vahoha_harness {
string q(const string& s) {
    string out = "\"";
    for (unsigned char c : s) {
        if (c == '"' || c == '\\') { out += '\\'; out += (char) c; }
        else if (c < 0x20) { char buf[8]; snprintf(buf, sizeof buf, "\\u%04x", c); out += buf; }
        else out += (char) c;
    }
    return out + "\"";
}
string json(int v) { return to_string(v); }
string json(long v) { return to_string(v); }
string json(long long v) { return to_string(v); }
string json(bool v) { return v ? "true" : "false"; }
string json(double v) {
    if (!isfinite(v)) throw runtime_error("returned a number that is not finite");
    ostringstream out;
    out << setprecision(17) << v;
    return out.str();
}
string json(float v) { return json((double) v); }
string json(const string& v) { return q(v); }
string json(const char* v) { return q(v); }
template <class T> string json(const vector<T>& v) {
    string out = "[";
    for (size_t i = 0; i < v.size(); i++) {
        if (i) out += ',';
        out += json(static_cast<T>(v[i]));
    }
    return out + "]";
}
}
`;

const caseFunction = (spec, testCase, index) => {
  const declarations = spec.params
    .map((p, i) => `        ${typeIn("cpp", p.type)} a${i} = ${literal("cpp", testCase.args[i], p.type)};`)
    .join("\n");
  const args = spec.params.map((_, i) => `a${i}`).join(", ");
  return String.raw`
static string vahoha_case${index}() {
    auto started = chrono::steady_clock::now();
    string entry;
    try {
${declarations}
        Solution solution;
        entry = "{\"ok\":true,\"value\":" + vahoha_harness::q(vahoha_harness::json(solution.${spec.name}(${args})));
    } catch (const exception& e) {
        entry = "{\"ok\":false,\"error\":" + vahoha_harness::q(string(e.what()));
    } catch (...) {
        entry = "{\"ok\":false,\"error\":" + vahoha_harness::q("the function threw a value that is not an exception");
    }
    long long ms = chrono::duration_cast<chrono::milliseconds>(chrono::steady_clock::now() - started).count();
    return entry + ",\"ms\":" + to_string(ms) + "}";
}
`;
};

/** The whole program for one submission. */
export const buildCppProgram = (code, spec, cases) => {
  const calls = cases.map((_, i) => `vahoha_case${i}()`).join(", ");
  return String.raw`${PREFIX}${code}
${HELPERS}${cases.map((c, i) => caseFunction(spec, c, i)).join("")}
int main() {
    streambuf* real = cout.rdbuf();
    ostringstream sink;
    cout.rdbuf(sink.rdbuf());
    vector<string> entries = { ${calls} };
    string report;
    for (size_t i = 0; i < entries.size(); i++) {
        if (i) report += ',';
        report += entries[i];
    }
    cout.rdbuf(real);
    cout << ${JSON.stringify(REPORT_MARKER)} << "{\"cases\":[" << report << "]}" << flush;
    return 0;
}
`;
};
