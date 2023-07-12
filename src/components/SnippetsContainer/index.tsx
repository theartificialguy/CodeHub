"use client";

import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "@/firebase/config";
import useAuthStore from "@/store/useAuthStore";
import Snippet from "../Snippet";

export interface ISnippet {
  id: string;
  code: string;
  extension: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export default function SnippetsContainer() {
  const user = useAuthStore((state) => state.user);
  const [snippets, setSnippets] = useState<ISnippet[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, `users/${user?.uid}/snippets`),
      (snapshot) => {
        if (!snapshot.empty) {
          const docData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSnippets(docData as ISnippet[]);
        }
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="my-8 flow-root">
      <div className="ml-4 flex flex-wrap">
        {/* snippet */}
        {snippets.length > 0 &&
          snippets.map((snippet) => {
            return (
              <Snippet
                key={snippet.id}
                snippetId={snippet.id}
                extension={snippet.extension}
                description={snippet.description}
              />
            );
          })}
      </div>
    </div>
  );
}
