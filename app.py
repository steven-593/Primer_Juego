from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    # Muy importante: host=0.0.0.0 para que Docker pueda exponer el puerto
    app.run(host="0.0.0.0", port=8000, debug=True)

