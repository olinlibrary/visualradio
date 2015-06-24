#!/usr/bin/python

from channel import Channel
import socket
import json

channelCount = 2
channels = []

for n in range(0, channelCount):
    channels.append(Channel(n))

# Send Status Updates to Web Server
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('', 41234))
s.listen(1)
while True:
    conn, addr = s.accept()
    channel = int(conn.recv(1024))
    if channel < channelCount and channel >= 0:
        conn.sendall(json.dumps(channels[channel].status()))
    conn.close()