const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = Number(process.env.PORT) || 5000;
const hostname = process.env.HOSTNAME || "0.0.0.0";

const app = next({
  dev,
  hostname,
  port,
  // Prefer standalone build dir when present (production hosting)
  dir: process.cwd(),
});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, hostname, () => {
      console.log(`LEV Shawarma ready → http://127.0.0.1:${port}`);
      console.log(`mode: ${dev ? "development" : "production"}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server.js", error);
    process.exit(1);
  });
