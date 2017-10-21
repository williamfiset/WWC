from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/json/<string:file_name>/")
def render(file_name):
    if not file_name.endswith(".json"):
        file_name = "%s.json" % (file_name,)
    return render_template(file_name)


if __name__ == "__main__":
    app.run()
