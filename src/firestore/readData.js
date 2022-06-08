import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase";

async function getDataFromFireStore() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id);
    console.log(doc.data());
  });
}

export { getDataFromFireStore };
