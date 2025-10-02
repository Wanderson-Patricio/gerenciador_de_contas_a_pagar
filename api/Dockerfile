FROM node:18-alpine

WORKDIR /api

RUN npm install -g json-server@0.17.4

# Copia o arquivo de banco de dados para o container
# COPY db.json .

# Expõe a porta padrão do json-server
EXPOSE 3000

# Comando para iniciar o json-server
CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "3000"]
