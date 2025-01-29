# 🎥 WebRTC Mock Server con FFmpeg y WebSockets

Este proyecto permite simular **streaming de video en vivo** usando **FFmpeg y WebSockets**.

## 🚀 Despliegue en Railway
1. **Sube el código a GitHub**.
2. **Crea un nuevo proyecto en Railway** y conéctalo con GitHub.
3. **Railway detectará automáticamente el Dockerfile** y desplegará la aplicación.

## 📌 Variables de Entorno
| Variable | Descripción |
|----------|------------|
| `PORT` | Puerto del servidor (por defecto `3000`) |
| `VIDEO_URL` | URL del video a transmitir (por defecto `https://www.w3schools.com/html/mov_bbb.mp4`) |

## 📺 Cómo verlo en un navegador
Crea un archivo `index.html` con el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Streaming WebSocket</title>
</head>
<body>
  <video id="video" controls autoplay></video>

  <script>
    const video = document.getElementById("video");
    const mediaSource = new MediaSource();
    video.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener("sourceopen", () => {
      const sourceBuffer = mediaSource.addSourceBuffer('video/mp2t; codecs="avc1.42E01E, mp4a.40.2"');
      const ws = new WebSocket("ws://TU_SERVIDOR_RAILWAY"); // Reemplaza con tu URL de Railway

      ws.binaryType = "arraybuffer";
      ws.onmessage = (event) => {
        sourceBuffer.appendBuffer(new Uint8Array(event.data));
      };
    });
  </script>
</body>
</html>
