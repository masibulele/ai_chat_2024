from flask import Flask , render_template, request
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()


app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get', methods=['GET','POST'])
def message():
    data= request.form['msg']
    print(data)

    response = get_completion(data)
    return response



# gets chatbot responses
def get_completion(data):
    client= OpenAI()
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": "You are a helpful friendly assistance that provides concise responses."},
            {"role": "user", "content": f"{data}"}
        ],

        temperature= 0.5,
        n=1,
        max_tokens= 250,
    )
    botResp =completion.choices[0].message.content
    return botResp


if __name__ == "__main__":
    app.run(debug=True)