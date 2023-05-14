const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
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

app.post("/deleteFile", async (req, res) => {
  const targetFolder = "/app/data";
  const filename = req.body.filename;

  if (fs.existsSync(path.join(targetFolder, filename))) {
    fs.unlink(path.join(targetFolder, filename), (err) => {
      if (err) {
        console.error("Error borrando el archivo:", err);
        res.status(500).send("Error borrando el archivo");
      } else {
        console.log("Archivo borrado exitosamente");
        res.status(200).send("Archivo borrado exitosamente");
      }
    });
  } else {
    res.status(404).send("Archivo no encontrado");
  }
});

app.listen(3001, () => {
  console.log("Servidor esperando en el puerto 3001");
});
