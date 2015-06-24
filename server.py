import json
from flask import *
from multiprocessing.connection import Client
import subprocess
from sys import platform as _platform

app = Flask(__name__)

address = ('localhost',9348) # Address to Radio Server

# Start Radio if Not Alive
if _platform == "linux" or _platform == "linux2":
    if subprocess.call(["pidof","-x","visualradio.py"]):
        subprocess.Popen(["./radio.py"])
        print "Radio Process Started"
    else:
        print "Radio Process Running"


@app.route("/")
def root():
    return render_template("index.html")

@app.route("/js/<path:path>")
def send_js(path):
    return send_from_directory('js',path)

@app.route("/status/<path:channel>")
def returnStatus(channel):
    conn = Client(address)
    conn.send_bytes(str(channel))
    status = conn.recv_bytes()
    conn.close()
    return status
    
if __name__ == '__main__':
    app.run()