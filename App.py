from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['Prasanna']
collection = db['data']  # Use a more descriptive name

# Get data from MongoDB
def load_data():
    data = pd.read_csv('data.csv')  # Replace 'your_dataset.csv' with the actual CSV file path
    data_dict = data.to_dict(orient='records')
    collection.insert_many(data_dict)

# Check if data is already loaded; if not, load it
if collection.count_documents({}) == 0:
    load_data()

# Get data from MongoDB
data = list(collection.find({}, {'_id': 0}))
Science = [entry.get('Science', 0) for entry in data]
Maths = [entry.get('Maths', 0) for entry in data]
Python=[entry.get('Maths', 0) for entry in data]
DS=[entry.get('Maths', 0) for entry in data]
DBMS=[entry.get('Maths', 0) for entry in data]

@app.route('/Mean', methods=['GET'])
def get_mean():
    science = np.mean(Science)
    maths = np.mean(Maths)
    python=np.mean(Python)
    dS=np.mean(DS)
    dBMS=np.mean(DBMS)
    response = {
        'Science': science,
        'Maths': maths,
        'Python':python,
        'DS': dS,
        'DBMS':dBMS
    }
    
    return jsonify(response)

@app.route('/Maximum', methods=['GET'])
def get_maximum():
    science = max(Science)
    maths = max(Maths)
    python=max(Python)
    dS=max(DS)
    dBMS=max(DBMS)
    response = {
        'Science': science,
        'Maths': maths,
        'Python':python,
        'DS': dS,
        'DBMS':dBMS
    }
    
    return jsonify(response)

@app.route('/Variance', methods=['GET'])  # Corrected route URL
def get_variance():
    science = np.var(Science)
    maths = np.var(Maths)
    python=np.var(Python)
    dS=np.var(DS)
    dBMS=np.var(DBMS)
    response = {
        'Science': science,
        'Maths': maths,
        'Python':python,
        'DS': dS,
        'DBMS':dBMS
    }
    
    return jsonify(response)

@app.route('/StandardDeviation', methods=['GET'])
def get_std_deviation():
    science = np.std(Science)
    maths = np.std(Maths)
    python=np.std(Python)
    dS=np.std(DS)
    dBMS=np.std(DBMS)
    response = {
        'Science': science,
        'Maths': maths,
        'Python':python,
        'DS': dS,
        'DBMS':dBMS
    }
    
    return jsonify(response)


@app.route('/Minimum', methods=['GET'])
def get_min():
    science = max(Science) - min(Science)  # Corrected calculation
    maths = max(Maths) - min(Maths)  # Corrected calculation
    python=max(Python) - min(Python)
    dS=max(DS) - min(DS)
    dBMS=max(DBMS) - min(DBMS)
    response = {
        'Science': science,
        'Maths': maths,
        'Python':python,
        'DS': dS,
        'DBMS':dBMS
    }
    return jsonify(response)
    
@app.route('/Median', methods=['GET'])
def get_median():
    science = np.median(Science)
    maths = np.median(Maths)
    python=np.median(Python)
    dS=np.median(DS)
    dBMS=np.median(DBMS)
    response = {
        'Science': science,
        'Maths': maths,
        'Python':python,
        'DS': dS,
        'DBMS':dBMS
    }
    
    return jsonify(response)




if __name__ == '__main__':  # Corrected "__main__"
    app.run(debug=True)
