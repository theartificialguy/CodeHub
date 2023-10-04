import { create } from "zustand";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

interface IAuth {
  user: User | null;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
}

const useAuthStore = create<IAuth>((set) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user })),
  googleSignIn: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // check if data in db already exists for this user
      const docData = await getDoc(doc(db, `users/${result.user.uid}`));
      if (!docData.exists()) {
        // if user is new, create data for this user in db
        await setDoc(doc(db, `users/${result.user.uid}`), {
          uid: result.user.uid,
          email: result.user.email,
          dispayName: result.user.displayName,
          created_at: serverTimestamp(),
          last_signed_in: serverTimestamp(),
        });
      }
      // if user data exists, update last signin
      await setDoc(
        doc(db, `users/${result.user.uid}`),
        {
          last_signed_in: serverTimestamp(),
        },
        {
          merge: true,
        }
      );
      set(() => ({ user: result.user }));
    } catch (error) {
      console.log(error);
      set((state) => ({ user: state.user }));
    }
  },
  signOut: async () => {
    try {
      await auth.signOut();
      set(() => ({
        user: null,
      }));
    } catch (error) {
      set((state) => ({ user: state.user }));
    }
  },
}));

export default useAuthStore;
