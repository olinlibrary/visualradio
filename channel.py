from threading import Timer
import time
from random import shuffle

class Channel:

    def __init__(self, channelID):
        self.channelID = channelID
        self.currentVideo = 99999
        self.timeOffset = 0
        self.playlist = [('KSwBT6QRUjA',10,150),('H5jHLv_TUEY',7,130),('wycjnCCgUes',7,180),('2syvnewH3NU',5,80)]

        # Start First Video
        self.nextVideo()

    # Advance Video
    def nextVideo(self):
        # Go to Next Video
        self.currentVideo = self.currentVideo + 1

        # Reached End of Playlist
        if self.currentVideo >= len(self.playlist):
            self.currentVideo = 0
            shuffle(self.playlist)

        # Debugging: Show Current Video
        print "Channel: "+str(self.channelID)+" | Current Video: "+str(self.playlist[self.currentVideo][0])

        # Update Video Time Offset
        self.timeOffset = time.time() - self.playlist[self.currentVideo][1]

        # Setup Timer to Advance to Next Video
        videoLength = self.playlist[self.currentVideo][2] - self.playlist[self.currentVideo][1]
        t = Timer(videoLength, self.nextVideo)
        t.start()

    def status(self):
        return (self.playlist[self.currentVideo][0], self.currentTime())

    def currentTime(self):
        return time.time() - self.timeOffset