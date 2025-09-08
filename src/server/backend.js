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

import {
  getFirestore,
  getDoc,
  doc,
  getDocs,
  collection,
  serverTimestamp,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

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
const db = getFirestore(app);

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

export async function continueAsOrganizer(user) {
  if (!user || !user.uid) {
    return { error: "No authenticated user", exists: false };
  }

  const organizerRef = doc(db, "organizers", user.uid);
  const organizerSnap = await getDoc(organizerRef);

  if (organizerSnap.exists()) {
    const subCollectionRef = collection(
      db,
      "organizers",
      user.uid,
      "elections"
    );
    const subSnap = await getDocs(subCollectionRef);
    // console.log("subSnap type:", typeof subSnap, "value:", subSnap);
    const electionsData = {};
    subSnap.forEach((doc) => {
      electionsData[doc.id] = { id: doc.id, ...doc.data() };
    });

    return {
      error: null,
      exists: true,
      organizerData: { id: user.uid, ...organizerSnap.data() },
      elections: electionsData,
    };
  } else {
    // docSnap.data() will be undefined in this case
    return {
      error: null,
      exists: false,
      elections: {},
    };
  }
}

export async function createNewElection(userUid, electionData) {
  try {
    const newElectionRef = doc(
      db,
      "organizers",
      userUid,
      "elections",
      electionData.title
    );
    const electionSnap = await getDoc(newElectionRef);

    if (electionSnap.exists()) {
      return { error: "An election with this name already exists" };
    }

    await setDoc(newElectionRef, {
      title: electionData.title,
      description: electionData.description,
      categories: electionData.categories,
      candidates: electionData.candidates,
      createdAt: serverTimestamp(),
    });

    const updatedElectionSnap = await getDoc(newElectionRef);
    const electionDataFromFirestore = {
      id: electionData.title,
      ...updatedElectionSnap.data(),
    };
    return {
      error: null,
      electionId: electionData.title,
      electionData: electionDataFromFirestore,
    };
  } catch (error) {
    return { error: error.message };
  }
}

export async function deleteCollection(db, collectionRef) {
  const querySnapshot = await getDocs(collectionRef);
  const batch = [];

  querySnapshot.forEach((doc) => batch.push(deleteDoc(doc.ref)));

  await Promise.all(batch);

  const subCollections = await getDocs(collection(db, collectionRef.path));
  for (const subCollection of subCollections) {
    await deleteCollection(
      db,
      collection(db, collectionRef.path, subCollection.id)
    );
  }
}

export async function deleteElection(userUid, electionId) {
  try {
    const electionRef = doc(db, "organizers", userUid, "elections", electionId);
    const electionSnap = await getDoc(electionRef);

    if (!electionSnap.exists()) {
      return { error: "Election does not exist" };
    }

    await deleteCollection(
      db,
      collection(db, "organizers", userUid, "elections", electionId)
    );
    await deleteDoc(electionRef);
    return { error: null, electionId };
  } catch (error) {
    return { error: error.message };
  }
}



