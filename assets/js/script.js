//Required Libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

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

// Get elements
const submitBtn = document.getElementById('submitBtn');
const inputBox = document.getElementById('textBox');
const linkText = document.getElementById('linkText');

async function addTextToDatabase(text){
    const docRef = await addDoc(collection(db, "UserPosts"), {
        content: text
    });
    showLink(docRef.id);
}

function showLink(postID){
    var link = document.querySelector("#linkText a");
    if (link) {
        link.href = "content.html?postId=" + postID;
    } else {
        link = document.createElement("a");
        link.href = "content.html?postId=" + postID;
        link.textContent = "Link";
        document.querySelector("#linkText").appendChild(link);
    }
    document.querySelector("#linkText").style.display = "block";
}



// Listen for the button click event
submitBtn.addEventListener('click', () => {
    const inputText = inputBox.value;
    addTextToDatabase(inputText);
});
