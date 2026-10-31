import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import { describe, expect, it } from "vitest";
import { codeRehypePlugins } from "@/components/ui/codeHighlight";

describe("codeRehypePlugins", () => {
  it("colors flow-control keywords apart from declarations", () => {
    const html = renderToStaticMarkup(
      <ReactMarkdown rehypePlugins={codeRehypePlugins}>{"```js\nconst a = 1;\nreturn a;\n```"}</ReactMarkdown>,
    );
    expect(html).toContain('<span class="hljs-keyword">const</span>');
    expect(html).toContain('<span class="hljs-keyword hljs-control">return</span>');
  });
});
