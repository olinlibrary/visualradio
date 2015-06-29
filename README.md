### Issues

```Error: Attempt to write a readonly database.```
Fix by giving write permissions to the database and the folder it's in:
```chmod a+w db
chmod a+w db/visualradio.db```