import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyDnv8NDmR2HQp0Z07x2r1IcbSKoIY24LgQ",
  authDomain: "sun-clothing.firebaseapp.com",
  projectId: "sun-clothing",
  storageBucket: "sun-clothing.appspot.com",
  messagingSenderId: "659070290125",
  appId: "1:659070290125:web:f216c0ab5dddf7059d8184",
  //measurementId: "G-2YEDXJ3MXR"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    console.log("Failed in userAuth, returning from here!!")
    return;
  }
    
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
