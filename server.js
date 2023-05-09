const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (file.mimetype === "audio/mpeg") {
    const targetFolder = "/app/data";

    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }

    fs.move(file.path, `${targetFolder}/${file.originalname}`, (err) => {
      if (err) {
        console.error("Error moving the file:", err);
        res.status(500).send("Error moving the file");
      } else {
        console.log("File moved successfully");
        res.status(200).send("File moved successfully");
      }
    });
  } else {
    res.status(400).send("Please upload an MP3 file");
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
