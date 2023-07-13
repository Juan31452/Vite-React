# Base de la imagen minode
FROM node:18-alpine as minode

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de la aplicación al contenedor
COPY package.json ./
COPY package-lock.json ./
COPY . ./

# Instalar dependencias
RUN npm install

# Compilar la aplicación
RUN npm run build

# Puerto en el que se ejecutará la aplicación
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
