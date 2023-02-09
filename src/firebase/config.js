import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyC_KEMuelnB4vDwH-68FgUaiXkDHiA3jvc",
	authDomain: "fir-ba04c.firebaseapp.com",
	projectId: "fir-ba04c",
	storageBucket: "fir-ba04c.appspot.com",
	messagingSenderId: "226405796600",
	appId: "1:226405796600:web:52a26507a701e86cc5090d"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export {firebase}