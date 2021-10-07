## Prerequire
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
* [Mongoose](https://account.mongodb.com/account/login): Create a mongoDB to store message, post
* [Pusher](https://dashboard.pusher.com/accounts/sign_in): Create a pusher app to make realtime app

## Setup
```
cd /whatsapp-backend
```

Create .env file if not exist and edit
```
touch .env

MONGODB_URI_LOCAL=your_mongoose_database_uri
PUSHER_APP_ID=your_pusher_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=pusher_secret
PUSHER_CLUSTER=pusher_cluster
PUSHER_USE_TLS=pusher_tls
PORT=9000

```

And Run `yarn start`


[Demo](https://whatsapp-mern-82fe9.web.app/)