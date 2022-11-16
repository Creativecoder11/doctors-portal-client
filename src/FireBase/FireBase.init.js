// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXp33kw3CNW0QUECcm-JnoOvoPqri-uRA",
  authDomain: "doctors-portal-ec66e.firebaseapp.com",
  projectId: "doctors-portal-ec66e",
  storageBucket: "doctors-portal-ec66e.appspot.com",
  messagingSenderId: "987597739500",
  appId: "1:987597739500:web:275620ac49537e54631cc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;