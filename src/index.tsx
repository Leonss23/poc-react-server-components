import { html } from "@elysiajs/html";
import swagger from "@elysiajs/swagger";
import Elysia, { t } from "elysia";
import { createElement } from "react";
import { renderToReadableStream } from "react-dom/server";

const index = Bun.file("./src/client/index.html");

const PORT = 8080;

new Elysia()
  .use(swagger())
  .use(html())
  .get("/lol", async () => {
    const stream = await renderToReadableStream(<Component />);
    return new Response(stream, { headers: { "Content-Type": "text/html" } });
  })
  .get("/", async () => {
    return index;
  })
  .get("/rsc", async () => {
    // const Page = (await import("../build/page.js")).default;
    const build = await Bun.build({
      entrypoints: ["./src/client/page.tsx"],
    });
    const Page = await build.outputs[0].text();
    return new Response(Page, {
      headers: { "Content-Type": "application/javascript" },
    });
  })
  .get("/id/:id", ({ params: { id } }) => id, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .listen(PORT, (s) => {
    console.log(`Listening on http://${s.hostname}:${s.port}`);
  });

function Component() {
  return (
    <body>
      <h1>Loool</h1>
    </body>
  );
}
