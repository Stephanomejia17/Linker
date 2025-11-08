FROM node:20-slim

# Instala dependencias necesarias para oracledb
RUN apt-get update && apt-get install -y libaio1 unzip curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]