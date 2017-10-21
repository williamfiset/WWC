# -*- coding: utf-8 -*-
"""
Created on Sat Oct 21 11:06:08 2017

@author: youyou
"""
import sys
import csv
import json
   
def read_csv(csv_file, json_file):
    csv_rows = []
    with open(csv_file) as f:
        reader = csv.DictReader(f)
        title = reader.fieldnames
        for row in reader:
            csv_rows.extend([{title[i]:row[title[i]] for i in range(len(title))}])
        write_json(csv_rows, json_file)    
   
def write_json(data, json_file):
    with open(json_file, "w") as f:
        f.write(json.dumps(data))

def main(csv_file, json_file):
    read_csv(csv_file, json_file)
        
if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])