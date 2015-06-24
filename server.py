from channel import Channel
import json
from flask import *

# Constants
channelCount = 2

# Initialize Channels
channels = []
for n in range(0, channelCount):
    channels.append(Channel(n))

app = Flask(__name__)

@app.route("/")
def root():
    return render_template("index.html")

@app.route("/js/<path:path>")
def send_js(path):
    return send_from_directory('js',path)

@app.route("/status/<path:channel>")
def returnStatus(channel):
    return json.dumps(channels[int(channel)].status())
    
if __name__ == '__main__':
    app.run()