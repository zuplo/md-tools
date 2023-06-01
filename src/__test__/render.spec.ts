import { expect } from "chai";
import { render } from "../index.js";

describe("Render", () => {
  it("Renders markdown with code blocks", async function () {
    const md = `# Title
    
Some code

\`\`\`json
{
  "test": 1,
  "test2:" "this is a string"
}
\`\`\`
    `;

    const result = await render(md);
    expect(result.html.toString()).contains(
      `<pre class="language-json"><code class="language-json"><span class="token punctuation">`
    );
  });

  it.only("Renders markdown and extracts headings", async function () {
    const md = `# Title
    
This is a document

## Subtitle 1

Hello

## Subtitle 2
    `;

    const result = await render(md);
    expect(result.headings).deep.equal([
      { depth: 1, value: "Title" },
      { depth: 2, value: "Subtitle 1" },
      { depth: 2, value: "Subtitle 2" },
    ]);
  });
});
