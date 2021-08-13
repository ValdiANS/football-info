const webPush = require('web-push');

const vKeys = {
    "publicKey":"BJJroH9ko7RQBJFBjsJLptT8roHkBiJyh-8XTq6CK4ifJGzhQm1Uh568lhuEbMbgf-lUNf79RlQGHZQQ5tB2PSA",
    "privateKey":"_hrz6YFrnzWUzoJiE8x9IV5H5QYGiri7sdy9kj3_OyE"
};

webPush.setVapidDetails(
    'mailto:rvdans002@gmail.com',
    vKeys.publicKey,
    vKeys.privateKey
);

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fo16O9cqryY:APA91bGCOqTrsccRjKKxPSQJXXmSrGYjKtWAtbG9ZKpx5zjze8UjZkUuoIVCo2h2jOQVawkO3xkKF1ldCrf8UEyxeFuXqyT0B5bfJQcKPbecvttybvC9nY510YBDRL7vaOEj8tubtSjn",
    "keys": {
        "p256dh": "BDFS9SScH/TUmYMBoOAX9ZqXOoAZQNvdmMkMCKJ7a3bkbYCIBNx04gmQ92NrSLUcPzMiQA2YvAUZnf3NcZieBXc=",
        "auth": "EDVPuomeTWQksH3cdP1Dyg=="
    }
};

const payload = "Ini adalah notifikasi payload dengan web push";
const options = {
    gcmAPIKey: "1098565234837",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);