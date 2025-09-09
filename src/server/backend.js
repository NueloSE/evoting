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
  writeBatch,
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

export async function loadCategories(user, electionName) {
  if (!electionName) {
    return { error: "Election not found", exists: false };
  }

  const categoryRef = collection(
    db,
    "organizers",
    user.uid,
    "elections",
    electionName,
    "categories"
  );
  const categoriesSnap = await getDocs(categoryRef);

  if (categoriesSnap.empty) {
    return { error: "No category found", categories: [] };
  }
  const categories = [];
  for (const categoryDoc of categoriesSnap.docs) {
    const categoryData = categoryDoc.data();
    const candidatesRef = collection(
      db,
      "organizers",
      user.uid,
      "elections",
      electionName,
      "categories",
      categoryDoc.id,
      "candidates"
    );
    const candidatesSnap = await getDocs(candidatesRef);
    const candidates = candidatesSnap.docs.map((candDoc) => ({
      id: candDoc.id,
      ...candDoc.data(),
    }));

    categories.push({
      id: categoryDoc.id,
      ...categoryData,
      candidates, // Include candidates array
    });
  }

  return { error: null, categories };
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

async function deleteCollection(db, collectionRef, batchSize = 100) {
  const querySnapshot = await getDocs(collectionRef);
  const batches = [];

  for (const doc of querySnapshot.docs) {
    const subcollectionRefs = await getDocs(
      collection(db, collectionRef.path, doc.id)
    );
    for (const subcollection of subcollectionRefs.docs) {
      await deleteCollection(
        db,
        collection(db, collectionRef.path, doc.id, subcollection.id)
      );
    }

    if (batches.length === 0 || batches[batches.length - 1].size >= batchSize) {
      batches.push(writeBatch(db));
    }

    batches[batches.length - 1].delete(doc.ref);
  }

  for (const batch of batches) {
    await batch.commit();
  }
}

export async function deleteElection(userUid, electionId) {
  try {
    const electionRef = doc(db, "organizers", userUid, "elections", electionId);
    const electionSnap = await getDoc(electionRef);

    if (!electionSnap.exists()) {
      return { error: "Election does not exist" };
    }

    const knownSubcollections = ["categories", "candidates"];
    for (const subcollectionName of knownSubcollections) {
      const subcollectionRef = collection(
        db,
        "organizers",
        userUid,
        "elections",
        electionId,
        subcollectionName
      );
      await deleteCollection(db, subcollectionRef);
    }

    await deleteDoc(electionRef);

    return { error: null, electionId };
  } catch (error) {
    return { error: error.message };
  }
}

export async function createCategory(user, electionId, categoryData) {
  if (!user || !electionId || !categoryData) {
    return { error: "No user or election selected" };
  }

  try {
    const newCategoryId = Date.now().toString();
    const categoryRef = doc(
      db,
      "organizers",
      user.uid,
      "elections",
      electionId,
      "categories",
      newCategoryId
    );

    await setDoc(categoryRef, {
      title: categoryData.title,
      description: categoryData.description, 
      createdAt: serverTimestamp(),
    })

    // const candidatesRef = collection(
    //   db,
    //   "organizers",
    //   user.uid,
    //   "elections",
    //   electionId,
    //   "categories",
    //   newCategoryId, "candidates"
    // );

    // const initialCandidateDocRef = doc(candidatesRef)
    // await setDoc(initialCandidateDocRef, {});
    
    return { error: null , categoryId: newCategoryId };
  } catch (error) {
    console.log("Creation failed because: ", error);
    return { error: "Failed to create" };
  }
}

export async function deleteCategory(user, electionId, categoryId) {
  if (!user || !user.uid || !electionId || !categoryId) {
    return { error: "No user, election, or category selected" };
  }

  try {
    const categoryRef = doc(
      db,
      "organizers",
      user.uid,
      "elections",
      electionId,
      "categories",
      categoryId
    );
    await deleteDoc(categoryRef);

    return { error: null };
  } catch (error) {
    console.log("Delete category error:", error);
    return { error: "Failed to delete category" };
  }
}

export async function createCandidate(
  user,
  electionId,
  categoryId,
  candidateData
) {
  if (!user || !user.uid || !electionId || !categoryId) {
    return { error: "No user, election, or category selected" };
  }

  try {
    const candidatesRef = collection(
      db,
      "organizers",
      user.uid,
      "elections",
      electionId,
      "categories",
      categoryId,
      "candidates"
    );
    const candidateDocRef = doc(candidatesRef); // Auto-generated unique ID
    await setDoc(candidateDocRef, {
      name: candidateData.name,
      description: candidateData.description,
      party: candidateData.party,
      createdAt: serverTimestamp(),
    });

    return { error: null, candidateId: candidateDocRef.id };
  } catch (error) {
    console.log("Create candidate error:", error);
    return { error: "Failed to create candidate" };
  }
}

export async function deleteCandidate(
  user,
  electionId,
  categoryId,
  candidateId
) {
  if (!user || !user.uid || !electionId || !categoryId || !candidateId) {
    return { error: "No user, election, category, or candidate selected" };
  }

  try {
    const candidateRef = doc(
      db,
      "organizers",
      user.uid,
      "elections",
      electionId,
      "categories",
      categoryId,
      "candidates",
      candidateId
    );
    await deleteDoc(candidateRef);

    return { error: null };
  } catch (error) {
    console.log("Delete candidate error:", error);
    return { error: "Failed to delete candidate" };
  }
}
