# Usar a imagem base do Node.js
FROM node:18-alpine

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Compilar o projeto
RUN npm run build

# Expor a porta que o aplicativo irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
