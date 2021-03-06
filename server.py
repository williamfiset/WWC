from flask import Flask, render_template, json, jsonify
import os
app = Flask(__name__)

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))

def parse_money(money):
    return float(money.replace(",", ""))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/json/<string:file_name>/")
def render(file_name):
    if not file_name.endswith(".json"):
        file_name = "%s.json" % (file_name,)
    return render_template("json/%s" % (file_name,))

@app.route("/heat_map/<string:year>/")
def muh_data(year):
    with open(os.path.join(SITE_ROOT, "templates/json/state_M%s_total.json" % (year,)), "r") as rh:
        data = json.load(rh)
    map_data = _get_map_data(data, "A_MEAN")
    return jsonify(map_data)

def _get_map_data(raw_data, col_name):
    """Get the data formatted for the map from the raw bls json data.
    Returns:
        A dict
    """
    map_dict = {"map": "usaLow", "areas": []}
    for state_data in raw_data:
        st_code = state_data["ST"]
        # Sorry DC
        if st_code != "DC":
            formatted_st_code = "US-" + st_code
            val = parse_money(state_data[col_name])
            map_dict["areas"].append({
                "id": formatted_st_code,
                "value": val,
            })
    return map_dict

@app.route("/major/<string:year>/<string:state>")
def get_state_data(year, state):
    with open(os.path.join(SITE_ROOT, "templates/json/state_M%s_major.json" % (year,)), "r") as rh:
        data = json.load(rh)
    state_data = _get_state_data(data, state)
    return jsonify(state_data)

def _get_state_data(data, state):
    state_dict = {"state": state, "major_salary_pairs": []}
    for state_data in data:
        if state_data["ST"] == state:
            major = state_data["OCC_TITLE"]
            occ = major.find(" Occupations")
            if occ != -1:
                major = major[:occ]
                salary = float(state_data["A_MEAN"].replace(",",""))
                state_dict["major_salary_pairs"].append({"major": major, "salary": salary})
    print (state_dict)
    return state_dict

if __name__ == "__main__":
    app.run()
