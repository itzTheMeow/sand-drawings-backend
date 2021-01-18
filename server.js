const express = require("express");
const app = express();
const server = require("http").createServer(app);
const fs = require("fs-extra");
const LZUTF8 = require("lzutf8");

app.use((req, res, next) => {
  if (req.headers.origin) res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/board/:id", (req, res) => {
  let id = req.params.id;
  if (!Number(id)) return res.json({ error: "Invalid board ID.", code: "ID_NOT_NUMBER" });
  res.json({});
  //res.sendFile(__dirname + "/boards/" + req.params.id);
});

const listener = server.listen(6500, function () {
  let addr = listener.address();
  console.log(`Listening at http://localhost:${addr.port}/`);
});

/*const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("Socket connected!");
  socket.on("message", (m) => {
    io.sockets.emit("incomingMessage", m);
  });
  socket.on("canvas", (c) => {
    io.sockets.emit("incomingCanvas", c);
  });
  socket.on("connecc", (r) => {
    io.sockets.emit("request", r);
    console.log("Connect");
  });
  socket.on("accept", (r) => {
    io.sockets.emit("accepted", r);
    console.log("Accept");
  });
  socket.on("export", (d) => {
    let ID = d.id;
    let data = d.toExport;
    let compressed = LZUTF8.compress(JSON.stringify(data), {
      outputEncoding: "StorageBinaryString",
    });
    fs.outputFile("boards/" + ID + ".json", compressed);
    console.log("Created file boards/" + ID + ".json!");
  });
  socket.on("import", (d) => {
    let toGet = d.fetch;
    let callback = d.callback;
    console.log(callback);
    let returned;
    try {
      returned = JSON.parse(
        LZUTF8.decompress(String(fs.readFileSync("./boards/" + toGet + ".json")))
      );
    } catch (e) {
      console.error(e);
    }
    console.log(returned + "e");
    callback(returned);
  });
});*/
