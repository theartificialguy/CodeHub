"use client";
import React, { useEffect, useState } from "react";
import {
  query,
  where,
  orderBy,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { HashLoader } from "react-spinners";

import { db } from "@/firebase/config";
import useAuthStore from "@/store/useAuthStore";
import useModalStore from "@/store/useModalStore";
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
  const setMode = useModalStore((state) => state.setMode);
  const setVisible = useModalStore((state) => state.setVisible);
  const [loading, setLoading] = useState<boolean>(true);
  const [snippets, setSnippets] = useState<ISnippet[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "snippets"),
        where("userId", "==", user?.uid),
        orderBy("created_at", "desc")
      ),
      (snapshot) => {
        if (!snapshot.empty) {
          const docData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSnippets(docData as ISnippet[]);
        }
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="relative h-[600px] w-[calc(100%)]">
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <HashLoader size={36} color="#304DFF" />
        </div>
      </div>
    );
  }

  if (!loading && snippets.length === 0) {
    return (
      <div className="flex p-4 pt-60 flex-col items-center justify-center space-y-4">
        <span className="text-4xl font-bold text-black/75">
          Get started by adding your favourite Snippets.
        </span>
        <button
          onClick={() => {
            setMode("create");
            setVisible(true);
          }}
          className="
              rounded-md border border-blue-600 bg-[#304DFF] p-2 text-sm font-normal text-slate-50
              hover:border hover:border-gray-800 hover:bg-[#eeee] hover:text-slate-700"
        >
          Add Snippet
        </button>
      </div>
    );
  }

  return (
    <div className="my-8 flow-root">
      <div className="ml-4 flex flex-wrap">
        {/* snippet */}
        {snippets.map((snippet) => {
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
