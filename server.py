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
    map_data = _get_map_data(data, "A_MEAN")
    print(map_data)
    # DO STUFF HERE

    return jsonify(map_data)

def _get_map_data(raw_data, col_name):
    """Get the data formatted for the map from the raw bls json data.
    Returns:
        A dict
    """
    map_dict = {"map": "usaLow", "areas": []}
    for state_data in raw_data:
        st_code = state_data["ST"]
        formatted_st_code = "US-" + st_code
        str_val = state_data[col_name].replace(",", "")
        val = float(str_val)
        map_dict["areas"].append({"id": formatted_st_code, "value": val})
    return map_dict
        

if __name__ == "__main__":
    app.run()
