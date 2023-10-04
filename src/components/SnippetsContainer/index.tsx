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
import useInputStore from "@/store/useInputStore";
import useDebounce from "@/hooks/useDebounce";
import { ISnippet } from "@/types";
import Snippet from "../Snippet";

export default function SnippetsContainer() {
  const user = useAuthStore((state) => state.user);
  const input = useInputStore((state) => state.input);
  const setMode = useModalStore((state) => state.setMode);
  const setVisible = useModalStore((state) => state.setVisible);
  const [loading, setLoading] = useState<boolean>(true);
  const [snippets, setSnippets] = useState<ISnippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<ISnippet[]>([]);

  const debouncedSearchInput = useDebounce(input, 300);

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

  useEffect(() => {
    if (debouncedSearchInput) {
      // searching/filtering based on description
      const _filteredSnippets = snippets.filter((item) =>
        item.description.toLowerCase().includes(debouncedSearchInput.toLowerCase())
      );
      setFilteredSnippets(_filteredSnippets);
    } else {
      setFilteredSnippets([]);
    }
  }, [debouncedSearchInput]);

  if (loading) {
    return (
      <div className="relative h-[600px] w-[calc(100%)]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <HashLoader size={36} color="#304DFF" />
        </div>
      </div>
    );
  }

  if (!loading && snippets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-4 pt-60">
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
        {input.length > 0
          ? filteredSnippets.map((snippet) => <Snippet {...snippet} />)
          : snippets.map((snippet) => <Snippet {...snippet} />)}
      </div>
    </div>
  );
}
