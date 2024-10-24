import { doc, addDoc, collection, deleteDoc, getDocs, updateDoc } from "firebase/firestore";
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
    const docRef = doc(database, collectionName, deleteId);
    await deleteDoc(docRef);
    
    const subCollections = await getDocs(collection(database, collectionName));
    for (const subCollection of subCollections.docs) {
      await deleteCollection(collection(database, subCollection.id));
    }
    // await deleteDoc(docRef);
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


export async function setGoalWarning(goalId) {
  try {
    const goalRef = doc(database, 'goals', goalId);
    await updateDoc(goalRef, {
      warning: true,
    });
  } catch (err) {
    console.error('Update document warning field: ', err);
  }
}


export async function realAllDocs(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    let newArray = []; 
    querySnapshot.forEach((docSnapshot) => {
      newArray.push({ ...docSnapshot.data()});
    });
    return newArray;
  } catch (err) {
    console.error("Read all docs: ", err);
  }
}