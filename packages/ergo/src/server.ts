import { createServer } from "http";
import { renderServer } from "./render-server";

console.log(renderServer);

const port = 4000;

const server = createServer((req, res) => {
  res.end("ok");
});

server.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
