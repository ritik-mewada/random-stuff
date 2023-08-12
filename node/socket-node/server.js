const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const chokidar = require("chokidar");
const path = require("path");
const ioClient = require("socket.io-client");
const fs = require("fs");
const xml2js = require("xml2js");
const axios = require("axios");
// path to send upcoming files
const folderPath = path.join(__dirname, "story");
const secondServerUrl = "http://localhost:8000";

function connectToClient() {
  const socket = ioClient("http://localhost:4000");

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
  socket.emit("custom_event", { message: "Hello from client" });
}

const port = 4000;
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectToClient();
});
io.listen(http);

function checkIsStoryValid(cmwWire) {
  const allowedWires = ["CMW", "CEW", "CCW"];

  console.log("CMW-WIRE", cmwWire);
  const response = cmwWire.some((w) => allowedWires.includes(w));
  return response;
}

// socket connection
io.on("connection", (socket) => {
  console.log("Client Connected.");

  const watcher = chokidar.watch(folderPath, {
    ignoreInitial: true,
  });

  watcher.on("add", (filePath) => {
    fs.readFile(filePath, "utf-8", (err, xmlData) => {
      if (err) {
        console.error("Error reading the XML file:", err);
        return;
      }

      xml2js.parseString(xmlData, (parseErr, result) => {
        if (parseErr) {
          console.error("Error parsing the XML:", parseErr);
          return;
        }

        const cmwStory = result["cmw-story"];
        if (!cmwStory) {
          console.log("cmw-story tag not found in the XML data.");
          return;
        }

        const headlineText = cmwStory["body"][0]["headline"][0];
        const cleanedHeadline = headlineText.replace(/\[I\]/g, "");

        const response = checkIsStoryValid(
          cmwStory["story-mdata"][0]["cmw-wires"][0]["cmw-wire"]
        );
        if (response) {
          console.log("EMIT");
          const data = {
            // creation_datetime: utcDate,
            story_id: cmwStory["$"]["cmw-story-number"],
            storyMetaData: cmwStory["story-mdata"][0],
            headline: cleanedHeadline,
          };
          const secondServerSocket = ioClient.connect(secondServerUrl);

          secondServerSocket.emit("incomingFile", data);

          secondServerSocket.on("fileLogged", () => {
            secondServerSocket.disconnect();
          });
        }

        // const docDate = cmwStory["$"]["docdate"];
        // const utcDate = new Date(docDate).toISOString();

        const file = path.basename(filePath); // fileName for api call
        // axios
        //   .post(`https://mobileapp-test.informistmedia.com/api/importer`, {
        //     file,
        //   })
        //   .then((response) => {
        //     console.log("API response:", response.data);
        //   })
        //   .catch((error) => {
        //     console.error("Error calling the API:", error.message);
        //   });
      });
    });
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
    watcher.close(); // Stop watching for file changes
  });
});
