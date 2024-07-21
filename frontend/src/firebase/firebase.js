// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUZ8F-dkzZP5fWs2hK2KexAp6vaG9mFEs",
  authDomain: "sustainability-732eb.firebaseapp.com",
  projectId: "sustainability-732eb",
  storageBucket: "sustainability-732eb.appspot.com",
  messagingSenderId: "744126317182",
  appId: "1:744126317182:web:bd5ced45bcc12c896f4e2f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
