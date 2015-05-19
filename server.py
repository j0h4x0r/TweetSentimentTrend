from flask import Flask, jsonify, send_from_directory
import json

app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
	return send_from_directory('.', 'index.html')

@app.route('/js/<path:path>')
def send_js(path):
	return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
	return send_from_directory('css', path)

@app.route('/data/')
def data():
	with open('result.json') as datafile:
		res = json.load(datafile)
	return jsonify(res)

if __name__ == '__main__':
	app.run(debug = True)