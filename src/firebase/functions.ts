import { db } from "./config";
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { ISnippet } from "@/components/SnippetsContainer";

export const addSnippet = async (
  userId: string,
  code: string,
  desc: string,
  ext: string
) => {
  try {
    const ref = collection(db, 'snippets');
    await addDoc(ref, {
      userId,
      extension: ext,
      description: desc,
      code: JSON.stringify(code),
      created_at: serverTimestamp(),
      updated_at: null,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getSnippet = async (snippetId: string) => {
  try {
    const ref = doc(db, `snippets/${snippetId}`);
    const data = await getDoc(ref);
    return data.exists() ? { id: data.id, ...data.data() } as ISnippet : null;
  } catch (error) {
    console.log(error);
  }
};

// Not in use for now
export const getSnippets = async (userId: string) => {
  try {
    const ref = collection(db, `users/${userId}/snippets`);
    const snippets = await getDocs(ref);
    return snippets.empty
      ? []
      : snippets.docs.map((doc) => ({ id: doc.id, ...doc.data }));
  } catch (error) {
    console.log(error);
  }
};

export const updateSnippet = async (
  snippetDocId: string,
  code: string,
  desc: string
) => {
  try {
    const ref = doc(db, `snippets/${snippetDocId}`);
    await updateDoc(ref, {
      description: desc,
      code: JSON.stringify(code),
      updated_at: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteSnippet = async (snippetDocId: string) => {
  try {
    const ref = doc(db, `snippets/${snippetDocId}`);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
