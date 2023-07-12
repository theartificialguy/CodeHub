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
    const ref = collection(db, `users/${userId}/snippets`);
    await addDoc(ref, {
      extension: ext,
      description: desc,
      code: JSON.stringify(code),
      created_at: serverTimestamp(),
      updated_at: null,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSnippet = async (userId: string, snippedId: string) => {
  try {
    const ref = doc(db, `users/${userId}/snippets/${snippedId}`);
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
  userId: string,
  snippetDocId: string,
  code: string,
  desc: string
) => {
  try {
    const ref = doc(db, `users/${userId}/snippets/${snippetDocId}`);
    await updateDoc(ref, {
      description: desc,
      code: JSON.stringify(code),
      updated_at: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSnippet = async (userId: string, snippetDocId: string) => {
  try {
    const ref = doc(db, `users/${userId}/snippets/${snippetDocId}`);
    await deleteDoc(ref);
  } catch (error) {
    console.log(error);
  }
};
