#!/usr/bin/python

from channel import Channel
from multiprocessing.connection import Listener
import json

channelCount = 2
channels = []

for n in range(0, channelCount):
    channels.append(Channel(n))

# Listen for Web Server to Talk
listener = Listener(('localhost',9348))
while True:
    conn = listener.accept() # Accept Connection
    channel = int(conn.recv_bytes()) # Get Channel Number
    conn.send_bytes(json.dumps(channels[channel].status()))
    conn.close()
listener.close()