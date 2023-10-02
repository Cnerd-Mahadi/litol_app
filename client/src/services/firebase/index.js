import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyB-B2H0TTAyRJE37th_V3oeyDrAZ4DK58M",
	authDomain: "litol---live-to-learn.firebaseapp.com",
	databaseURL:
		"https://litol---live-to-learn-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "litol---live-to-learn",
	storageBucket: "litol---live-to-learn.appspot.com",
	messagingSenderId: "960608961342",
	appId: "1:960608961342:web:ab81faaaa76576f871a26f",
	measurementId: "G-37X3F1ZXM4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
