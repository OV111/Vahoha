// Go harness: `package main`, the learner's function, then a main() that calls
// it once per hidden case and prints the report.
//
// The harness's imports are renamed (vhFmt and so on) so a learner who imports
// "fmt" too does not get "fmt redeclared". interface{} rather than `any` keeps
// it compiling on the older Go a self-hosted Judge0 ships.
//
// It encodes results itself instead of importing encoding/json: that package
// alone pushed compiling past the public Judge0's compile time limit about
// half the time. Everything imported here is something fmt already needs.

import { parseType } from "../../../../../constants/challengeTypes.js";
import { literal } from "./literals.js";
import { REPORT_MARKER } from "./report.js";

// "//line" makes compiler errors point at the learner's own line numbers.
const PREFIX = `package main

import (
	vhFmt "fmt"
	vhMath "math"
	vhOS "os"
	vhReflect "reflect"
	vhStrconv "strconv"
	vhTime "time"
)

//line solution.go:1
`;

// A nil slice is how Go says "empty", but it encodes as null. When the
// function returns a slice, null is reported as [] so it compares as empty.
const HELPERS = String.raw`
//line harness.go:1
func vhQuote(s string) string {
	out := []byte{'"'}
	for i := 0; i < len(s); i++ {
		c := s[i]
		switch {
		case c == '"' || c == '\\':
			out = append(out, '\\', c)
		case c < 0x20:
			out = append(out, vhFmt.Sprintf("\\u%04x", c)...)
		default:
			out = append(out, c)
		}
	}
	return string(append(out, '"'))
}

func vhEncode(v vhReflect.Value) string {
	switch v.Kind() {
	case vhReflect.Invalid:
		return "null"
	case vhReflect.Bool:
		return vhStrconv.FormatBool(v.Bool())
	case vhReflect.Int, vhReflect.Int8, vhReflect.Int16, vhReflect.Int32, vhReflect.Int64:
		return vhStrconv.FormatInt(v.Int(), 10)
	case vhReflect.Uint, vhReflect.Uint8, vhReflect.Uint16, vhReflect.Uint32, vhReflect.Uint64:
		return vhStrconv.FormatUint(v.Uint(), 10)
	case vhReflect.Float32, vhReflect.Float64:
		f := v.Float()
		if vhMath.IsNaN(f) || vhMath.IsInf(f, 0) {
			panic("returned a number that is not finite")
		}
		return vhStrconv.FormatFloat(f, 'g', -1, 64)
	case vhReflect.String:
		return vhQuote(v.String())
	case vhReflect.Interface, vhReflect.Ptr:
		if v.IsNil() {
			return "null"
		}
		return vhEncode(v.Elem())
	case vhReflect.Slice, vhReflect.Array:
		if v.Kind() == vhReflect.Slice && v.IsNil() {
			return "null"
		}
		out := "["
		for i := 0; i < v.Len(); i++ {
			if i > 0 {
				out += ","
			}
			out += vhEncode(v.Index(i))
		}
		return out + "]"
	}
	panic("returned a " + v.Type().String() + ", which cannot be compared")
}

func vhRun(slice bool, call func() interface{}) (entry string) {
	started := vhTime.Now()
	defer func() {
		if r := recover(); r != nil {
			entry = "{\"ok\":false,\"error\":" + vhQuote(vhFmt.Sprint(r))
		}
		entry += ",\"ms\":" + vhStrconv.FormatInt(int64(vhTime.Since(started)/vhTime.Millisecond), 10) + "}"
	}()
	text := vhEncode(vhReflect.ValueOf(call()))
	if slice && text == "null" {
		text = "[]"
	}
	return "{\"ok\":true,\"value\":" + vhQuote(text)
}
`;

const caseCall = (spec, testCase, slice) => {
  const declarations = spec.params
    .map((p, i) => `\t\t\ta${i} := ${literal("go", testCase.args[i], p.type)}`)
    .join("\n");
  const args = spec.params.map((_, i) => `a${i}`).join(", ");
  // An unused parameter variable would not compile, but every one is passed on.
  return `\t\tvhRun(${slice}, func() interface{} {
${declarations}
\t\t\treturn ${spec.name}(${args})
\t\t}),`;
};

/** The whole program for one submission. */
export const buildGoProgram = (code, spec, cases) => {
  // The harness supplies the package clause; a learner's own would be a
  // second one and fail to compile.
  const source = String(code).replace(/^\s*package\s+\w+\s*;?\s*$/m, "");
  const slice = parseType(spec.returns).depth > 0;
  return String.raw`${PREFIX}${source}
${HELPERS}
func main() {
	vhReal := vhOS.Stdout
	if sink, err := vhOS.OpenFile(vhOS.DevNull, vhOS.O_WRONLY, 0); err == nil {
		vhOS.Stdout = sink
	}
	entries := []string{
${cases.map((c) => caseCall(spec, c, slice)).join("\n")}
	}
	report := ""
	for i, entry := range entries {
		if i > 0 {
			report += ","
		}
		report += entry
	}
	vhReal.WriteString(${JSON.stringify(REPORT_MARKER)} + "{\"cases\":[" + report + "]}")
}
`;
};
