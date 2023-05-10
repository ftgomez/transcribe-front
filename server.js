const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const cors = require("cors");

const app = express();
app.use(cors());
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
        console.error("Error moviendo el archivo:", err);
        res.status(500).send("Error moviendo el archivo");
      } else {
        console.log("Archivo movido exitosamente");
        res.status(200).send("Archivo movido exitosamente");
      }
    });
  } else {
    res.status(400).send("Por favor subir un archivo MP3");
  }
});

app.listen(3001, () => {
  console.log("Servidor esperando en el puerto 3001");
});
