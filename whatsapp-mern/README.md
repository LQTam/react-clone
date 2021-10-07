## Prerequire
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
* [Pusher](https://dashboard.pusher.com/)
Create pusher channel and get the channel info

## Setup
```
cd /whatsapp-mern
```

Create .env file if not exist and edit
```
touch .env

REACT_APP_PUSHER_KEY=your_pusher_key
REACT_APP_ENDPOINT=your_backend_endpoint

REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

And Run `yarn start`


[Demo](https://whatsapp-mern-82fe9.web.app/)