from flask import Flask, render_template, json, jsonify
import os
app = Flask(__name__)

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/json/<string:file_name>/")
def render(file_name):
    if not file_name.endswith(".json"):
        file_name = "%s.json" % (file_name,)
    return render_template("json/%s" % (file_name,))

@app.route("/heat_map")
def muh_data():
    with open(os.path.join(SITE_ROOT, "templates/json/state_M2016_total.json"), "r") as rh:
        data = json.load(rh)
    print(data)
    # DO STUFF HERE

    return jsonify(data)

if __name__ == "__main__":
    app.run()
