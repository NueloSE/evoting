import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// my configuration setting
const firebaseConfig = {
  apiKey: "AIzaSyDR7TQlVmeiDB7RQkLCyu_BDNU-OaY7Vgs",
  authDomain: "evoting-89793.firebaseapp.com",
  projectId: "evoting-89793",
  storageBucket: "evoting-89793.firebasestorage.app",
  messagingSenderId: "1013799815570",
  appId: "1:1013799815570:web:de2d03d4e2d450f5a7194b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

// create a new user with email and password
export const createNewUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { error: null, user: userCredential.user };
  } catch (error) {
    return { message: error.message, user: null };
  }
};

// user signin
export const signInEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { error: null, user: userCredential.user };
  } catch (error) {
    return { message: error.message, user: null };
  }
};

// google sign in method
export const authSignInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return { error: null, user: result.user, token: credential.accessToken };
  } catch (error) {
    return { message: error.message, user: null };
  }
};

export const logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      return { message: error.message };
    });
};

export function monitorAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}
