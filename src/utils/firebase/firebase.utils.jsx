import { initializeApp } from "firebase/app";
import { getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtlyVP_R6ZQk4pK2ZbOdSmfsqDCiYvajs",
    authDomain: "crwn-clothing-db-38c9a.firebaseapp.com",
    projectId: "crwn-clothing-db-38c9a",
    storageBucket: "crwn-clothing-db-38c9a.appspot.com",
    messagingSenderId: "1062188427653",
    appId: "1:1062188427653:web:588bd71811ce0a49587cec"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    promt:"select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid)

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    
    //check if user data does not exists
    //create / set document with data from userauth in my collection
    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createAt
        });
      } catch (error){
        console.log("error creating user", error.message);
      }
    }

    //if data exists
    //return userDocRef 
    return userDocRef;
  };