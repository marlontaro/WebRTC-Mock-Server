import express from "express";
import { Server } from "ws";
import ffmpeg from "fluent-ffmpeg";
import dotenv from "dotenv";

dotenv.config();

const VIDEO_URL = process.env.VIDEO_URL || "https://www.w3schools.com/html/mov_bbb.mp4";
const PORT = process.env.PORT || 3000;

const app = express();
const server = app.listen(PORT, () => console.log(`Servidor WebRTC Mock corriendo en http://localhost:${PORT}`));
const wss = new Server({ server });

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  try {
    const ffmpegProcess = ffmpeg(VIDEO_URL)
      .format("mpegts")
      .videoCodec("libx264")
      .audioCodec("aac")
      .outputOptions(["-preset ultrafast", "-tune zerolatency"])
      .on("error", (err) => console.error("Error en FFmpeg:", err))
      .pipe(ws, { end: false });

    ws.on("close", () => {
      console.log("Cliente desconectado");
      ffmpegProcess.kill();
    });
  } catch (error) {
    console.error("Error al iniciar FFmpeg:", error);
  }
});
