import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firebase";

async function addDataToFireStore(collectionDB, data) {
  try {
    const docRef = await addDoc(collection(db, collectionDB), data);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export { addDataToFireStore };
