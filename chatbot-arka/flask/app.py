from flask import Flask, render_template, request, session, jsonify
from utils import send_message_to_rasa

app = Flask(__name__)
app.secret_key = '7ecdd05e459dd0d3534b4a5b135a0522280843838202e04e'

@app.route("/", methods=["GET", "POST"])
def index():
    if 'chat_history' not in session:
        session['chat_history'] = []

    if request.method == "POST":
        user_message = request.form["message"]
        session['chat_history'].append(f"User: {user_message}")

        rasa_response = send_message_to_rasa(user_message)
        bot_response = ""
        
        for message in rasa_response:
            if 'text' in message:
                bot_response += message['text'] + ' '
        
        session['chat_history'].append(f"Bot: {bot_response.strip()}")
        
        # Return JSON response
        return jsonify(rasa_response)
    
    return render_template("index.html", chat_history=session['chat_history'])

if __name__ == "__main__":
    app.run(debug=True)
