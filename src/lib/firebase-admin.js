import admin from "firebase-admin";
import config from "./service-account.json" assert { type: "json" }

admin.initializeApp({
    credential: admin.credential.cert(config),
});

export const firebaseAuth = admin.auth();
