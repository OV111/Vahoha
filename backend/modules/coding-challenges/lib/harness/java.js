// Java harness: the learner's `class Solution` followed by a `Main` class that
// calls the method once per hidden case and prints the report.
//
// Judge0 saves the program as Main.java, so the only public class must be Main.
// The learner's file comes first and unchanged except for that rule, which
// keeps compiler line numbers the same as in their editor.

import { typeIn } from "#shared/challengeTypes.js";
import { literal } from "./literals.js";
import { REPORT_MARKER } from "./report.js";

// String.raw keeps every backslash as written, so this is exactly the Java
// source. "\\u%04x" must stay doubled: javac reads a single \u as an escape.
const HELPERS = String.raw`
    private static String q(String s) {
        StringBuilder b = new StringBuilder("\"");
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '"' || c == '\\') b.append('\\').append(c);
            else if (c < 0x20 || c >= 0x7f) b.append(String.format("\\u%04x", (int) c));
            else b.append(c);
        }
        return b.append('"').toString();
    }

    private static String json(Object v) {
        if (v == null) return "null";
        if (v instanceof String) return q((String) v);
        if (v instanceof Character) return q(String.valueOf(v));
        if (v instanceof Boolean) return v.toString();
        if (v instanceof Double || v instanceof Float) {
            double d = ((Number) v).doubleValue();
            if (Double.isNaN(d) || Double.isInfinite(d)) {
                throw new IllegalArgumentException("returned " + d + ", which is not a finite number");
            }
            return Double.toString(d);
        }
        if (v instanceof Number) return v.toString();
        if (v.getClass().isArray()) {
            int n = java.lang.reflect.Array.getLength(v);
            StringBuilder b = new StringBuilder("[");
            for (int i = 0; i < n; i++) {
                if (i > 0) b.append(',');
                b.append(json(java.lang.reflect.Array.get(v, i)));
            }
            return b.append(']').toString();
        }
        if (v instanceof Iterable) {
            StringBuilder b = new StringBuilder("[");
            boolean first = true;
            for (Object item : (Iterable<?>) v) {
                if (!first) b.append(',');
                first = false;
                b.append(json(item));
            }
            return b.append(']').toString();
        }
        throw new IllegalArgumentException("returned a " + v.getClass().getSimpleName() + ", which cannot be compared");
    }

    private static String describe(Throwable e) {
        String message = e.getMessage();
        return e.getClass().getSimpleName() + (message == null ? "" : ": " + message);
    }
`;

// One method per case: a single method holding every case could pass the JVM's
// 64 KB limit on a method's bytecode.
const caseMethod = (spec, testCase, index) => {
  const declarations = spec.params
    .map((p, i) => `            ${typeIn("java", p.type)} a${i} = ${literal("java", testCase.args[i], p.type)};`)
    .join("\n");
  const args = spec.params.map((_, i) => `a${i}`).join(", ");
  return String.raw`
    private static String case${index}() {
        long started = System.nanoTime();
        String entry;
        try {
${declarations}
            Object result = new Solution().${spec.name}(${args});
            entry = "{\"ok\":true,\"value\":" + q(json(result));
        } catch (Throwable e) {
            entry = "{\"ok\":false,\"error\":" + q(describe(e));
        }
        return entry + ",\"ms\":" + (System.nanoTime() - started) / 1000000 + "}";
    }
`;
};

/** The whole Main.java for one submission. */
export const buildJavaProgram = (code, spec, cases) => {
  // "public class Solution" would have to live in Solution.java. Package
  // access is all the harness needs, so the modifier is dropped.
  const source = String(code).replace(/^(\s*)public\s+((?:final\s+|abstract\s+)*)class\s/gm, "$1$2class ");
  const calls = cases.map((_, i) => `case${i}()`).join(", ");
  return String.raw`${source}

public class Main {${HELPERS}${cases.map((c, i) => caseMethod(spec, c, i)).join("")}
    public static void main(String[] args) {
        java.io.PrintStream real = System.out;
        System.setOut(new java.io.PrintStream(java.io.OutputStream.nullOutputStream()));
        String[] entries = { ${calls} };
        real.print(${JSON.stringify(REPORT_MARKER)} + "{\"cases\":[" + String.join(",", entries) + "]}");
        real.flush();
    }
}
`;
};
