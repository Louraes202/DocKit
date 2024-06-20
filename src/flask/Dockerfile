# Usar a imagem base do Python
FROM python:3.9-slim

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de requisitos e instalá-los
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copiar o código da aplicação
COPY . .

# Expor a porta que a aplicação vai rodar
EXPOSE 5000

# Comando para rodar a aplicação
CMD ["python", "app.py"]
