import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyByJfrnqd1uHItizNcFOgsFD150Q236kbE",
  authDomain: "railwaycrackmonitoring.firebaseapp.com",
  databaseURL: "https://railwaycrackmonitoring-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "railwaycrackmonitoring",
  storageBucket: "railwaycrackmonitoring.firebasestorage.app",
  messagingSenderId: "727828035791",
  appId: "1:727828035791:web:c054e0be5eae5b387d1fba",
  measurementId: "G-1WPLDG80DB"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
