import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

// create new collection in DB
export const addCollectionAndDocs = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};

// receive data from DB
export const getCategoriesAndDocs = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshop = await getDocs(q);
    const caterogyMap = querySnapshop.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return caterogyMap;
}

// creates User Documents
export const createUserDocFromAuth = async (userAuth, additionalInformation ={}) => {
    if(!userAuth) return;
    // unique user id
    const userDocRef = doc(db, 'user', userAuth.uid);
    // user documents
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch(e) {
            console.error('erroe', e.essage);
        }
    }
    return userDocRef;
}

// creates User using email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

// Sign In User
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

// Sign Out User
export const signOutUser = async () => await signOut(auth);

// listen if user state changed
export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);
