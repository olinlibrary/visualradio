### Adding a Channel Image

To add a channel image, upload the 125x125px png file to the static/icons folder, named channelnumber.png.

### Permissions

If READ_ONLY in the config file is set to true, nobody can edit the channels.

If READ_ONLY is set to false and LOGIN is set to false, anybody can edit the channels.

If READ_ONLY is set to false and LOGIN is set to true, only users on the comma-separated ALLOWED_USERS list can edit the channels.

### Database

Right now, the whole database is stored in a sqlite file in the db folder. To back up the database, just make a copy of this file.