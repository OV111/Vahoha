// Turns a learner's TypeScript into the JavaScript the sandbox runs.
//
// Only types are removed (sucrase); nothing is type-checked. A type error is not
// a failure, but a syntax error is, and it must come back as a clear message
// rather than a 500, so the error is reported instead of thrown further.

import { transform } from "sucrase";

/**
 * @returns {{ code: string } | { error: string }}
 */
export const stripTypes = (source) => {
  try {
    const { code } = transform(String(source), { transforms: ["typescript"] });
    return { code };
  } catch (err) {
    // sucrase appends "(line:col)" to the message, which is what the learner needs.
    return { error: err?.message ?? "Could not read this TypeScript." };
  }
};
