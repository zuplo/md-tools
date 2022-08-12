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

    const html = await render(md);
    expect(html).contains(
      `<pre class="language-json"><code class="language-json"><span class="token punctuation">`
    );
  });
});
