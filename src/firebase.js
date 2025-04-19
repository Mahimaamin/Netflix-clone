
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {

  apiKey: "AIzaSyA_IGenDo4Dh6HtjJFV1Mca0Zgh4B-zbkI",

  authDomain: "netflix-clone-525ea.firebaseapp.com",

  projectId: "netflix-clone-525ea",

  storageBucket: "netflix-clone-525ea.firebasestorage.app",

  messagingSenderId: "1079150870916",

  appId: "1:1079150870916:web:bb17c082b9de56d67b1dd1"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password );
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

    }
    const login = async (email, password)=>{
        try {
            signInWithEmailAndPassword(auth, email, password);

        } catch (error){
            console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(" "));
        }
    }

    const logout = ()=>{
        signOut(auth);
    }

    export {auth, db, login, signup, logout};
