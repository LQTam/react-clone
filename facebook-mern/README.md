This is the Frontend written by ReactJS using with Pusher and connect to **facebook-mern-backend API**
## Install
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
* [Pusher](https://dashboard.pusher.com/accounts/sign_in): Create a pusher app to make realtime app

## Setup
```
cd /amazone-clone
yarn start
```

Create _.env_ file if not exists `touch .env` then edit
```
REACT_APP_SERVER_ENDPOINT=your_server_endpoint
REACT_APP_PUSHER_AUTH_ENDPOINT=pusher/auth
REACT_APP_PUSHER_KEY=
REACT_APP_PUSHER_CLUSTER=

REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
REACT_APP_AWS_BASE_URL=
```

Then run `yarn start`

[Demo](https://fb-mern-08-10.web.app/)