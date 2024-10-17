import { doc, addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    return docRef
  } catch (err) {
    console.error("Write to DB: ", err);
  }
}

export async function deleteFromDB(deleteId, collectionName) { 
  try {
    await deleteDoc(doc(database, collectionName, deleteId));
  } catch (err) {
    console.error("Delete from DB: ", err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapshot) => {
      deleteFromDB(docSnapshot.id, collectionName);
    });
  } catch (err) {
    console.error("Delete all from DB: ", err);
  }
}