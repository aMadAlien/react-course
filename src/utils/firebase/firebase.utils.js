import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDsaukHiQnc54Z1Gtq3r8M6K51-PvAsL90",
    authDomain: "react-course-66d2e.firebaseapp.com",
    projectId: "react-course-66d2e",
    storageBucket: "react-course-66d2e.appspot.com",
    messagingSenderId: "196879481014",
    appId: "1:196879481014:web:af60c159c922dffe70ce17"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Data Base
export const db = getFirestore();

// creates User Documents
export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'user', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch(e) {
            console.error('erroe', e.essage);
        }
    }
    return userDocRef;
}