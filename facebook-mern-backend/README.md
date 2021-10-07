This is the backend provide for **facebook-mern** Frontend to call

## Install
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
* [AWS Bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html): Create a s3 bucket for using to storage media files
* [Mongoose](https://account.mongodb.com/account/login): Create a mongoDB to store message, post
* [Pusher](https://dashboard.pusher.com/accounts/sign_in): Create a pusher app to make realtime app

## Setup
```
cd /amazone-clone
yarn start
```

Create _.env_ file if not exists `touch .env` then edit
```
AWSAccessKeyId=
AWSSecretKey=
MONGODB_URI_LOCAL=
AWS_BASE_URL=
AWS_Region=
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
PUSHER_USE_TLS=
BUCKET_NAME=
```

Then run `yarn start`