import os
from openai import OpenAI

# Obter a chave da API da variável de ambiente
api_key = os.getenv('API_KEY')

# Inicializar o cliente OpenAI com a chave da API
client = OpenAI(api_key=api_key)

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "user", "content": "First, I want to say that I'm sorry for what I did."},
    {"role": "user", "content": "I didn't mean to hurt you, but I know that I did."},
    {"role": "user", "content": "I just want to make things right."},
    {"role": "user", "content": "What was my first message?"}
  ]
)

print(completion.choices[0].message.content)
