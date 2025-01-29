# Usa una imagen de Node.js con FFmpeg
FROM jrottenberg/ffmpeg:4.4-alpine AS ffmpeg
FROM node:18-alpine

# Copiar FFmpeg desde la imagen anterior
COPY --from=ffmpeg /usr/local/bin/ffmpeg /usr/local/bin/ffmpeg
COPY --from=ffmpeg /usr/local/bin/ffprobe /usr/local/bin/ffprobe

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install --production

# Copiar el código fuente
COPY . .

# Exponer el puerto del servidor
EXPOSE 3000

# Ejecutar el servidor
CMD ["node", "server.js"]
