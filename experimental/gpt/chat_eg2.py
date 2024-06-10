import os
import openai
import tkinter as tk
from tkinter import scrolledtext, simpledialog

# Obter a chave da API da variável de ambiente
api_key = os.getenv('API_KEY')
openai.api_key = api_key

class ChatGPTApp:
    def __init__(self, root):
        self.root = root
        self.root.title("ChatGPT Clone")
        self.root.geometry("600x600")

        self.messages = [
            {"role": "system", "content": "You are a helpful assistant."}
        ]

        self.create_widgets()

    def create_widgets(self):
        self.chat_window = scrolledtext.ScrolledText(self.root, wrap=tk.WORD)
        self.chat_window.pack(pady=10, padx=10, fill=tk.BOTH, expand=True)
        self.chat_window.config(state=tk.DISABLED)

        self.input_frame = tk.Frame(self.root)
        self.input_frame.pack(pady=10, padx=10, fill=tk.X, expand=False)

        self.entry = tk.Entry(self.input_frame, width=80)
        self.entry.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 10))
        self.entry.bind("<Return>", self.send_message)

        self.send_button = tk.Button(self.input_frame, text="Send", command=self.send_message)
        self.send_button.pack(side=tk.RIGHT)

    def send_message(self, event=None):
        user_message = self.entry.get()
        if user_message.strip():
            self.append_message("user", user_message)
            self.entry.delete(0, tk.END)
            self.get_response(user_message)

    def append_message(self, role, content):
        self.messages.append({"role": role, "content": content})
        self.chat_window.config(state=tk.NORMAL)
        self.chat_window.insert(tk.END, f"{role.capitalize()}: {content}\n")
        self.chat_window.config(state=tk.DISABLED)
        self.chat_window.yview(tk.END)

    def get_response(self, user_message):
        try:
            client = openai.OpenAI(api_key=api_key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=self.messages
            )
            assistant_message = response.choices[0].message.content
            self.append_message("assistant", assistant_message)
        except Exception as e:
            self.append_message("system", f"Error: {str(e)}")

if __name__ == "__main__":
    root = tk.Tk()
    app = ChatGPTApp(root)
    root.mainloop()
