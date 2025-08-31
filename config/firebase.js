// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc,
    query,
    orderBy,
    where,
    limit
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAXeXakolOZ04EF_ZMpjSCCtoyDWoGqkB8",
    authDomain: "english-vocab-app-92bf6.firebaseapp.com",
    projectId: "english-vocab-app-92bf6",
    storageBucket: "english-vocab-app-92bf6.appspot.com",
    messagingSenderId: "271355821192",
    appId: "1:271355821192:web:c23175cff3ec451ed1733d",
    measurementId: "G-2P96V50YPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firebase services
window.firebase = {
    db,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    where,
    limit
};

export { db, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where, limit };