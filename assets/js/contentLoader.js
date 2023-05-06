//Required Libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

//Firebase keys
const firebaseConfig = {
    apiKey: "AIzaSyAuGaedjJfmBx878neSu0j0WskfeKnr1qM",
    authDomain: "awpaste.firebaseapp.com",
    projectId: "awpaste",
    storageBucket: "awpaste.appspot.com",
    messagingSenderId: "660017428469",
    appId: "1:660017428469:web:996c0069bf90a4048192bc",
    measurementId: "G-XTLTWSZMLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Get URL parameters
const url = window.location.href;
const params = new URLSearchParams(new URL(url).search);
const firstParamValue = params.values().next().value;

//Get elements
const header = document.getElementById("header");
const content = document.getElementById("content");

//Function for reading data
async function readDataFromDatabase(postID){
    const docRef = doc(db, "UserPosts", postID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        changeContent(docSnap.data().content);
    } else {
        header.textContent = "No post with that ID found :("
    }
}

function changeContent(text){
    header.textContent = "Content:";
    content.textContent = text;
}

//Check URL parameter cause im cool like that
if(firstParamValue != null){
    readDataFromDatabase(firstParamValue);
}

