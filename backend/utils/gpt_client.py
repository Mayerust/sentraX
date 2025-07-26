import os, openai
openai.api_key = os.getenv("OPENAI_API_KEY")

def ask_gpt(prompt: str):
    resp = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role":"system","content":"You are a pentest expert."},
                  {"role":"user","content":prompt}]
    )
    return resp.choices[0].message.content