## Prerequire
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
* [Mongoose](https://dashboard.pusher.com/)
Create mongoose Project and Database

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

```

And Run `yarn start`


[Demo](https://whatsapp-mern-82fe9.web.app/)