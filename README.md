# React Authentication

This is a learning exercise

Create `server/config.js` and add a secret key (used for JWT).  Can be any random string.

```
module.exports = {
  secret: 'your-secret-key-here'
};
```

Make sure Mongodb is installed (the install documentation is [here](https://docs.mongodb.org/manual/installation/)). Start `mongod`:

```
mongod
```

Install and Start up server app:

```
cd server
npm install
npm run dev
```
