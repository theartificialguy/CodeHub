"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { LanguageSupport } from "@codemirror/language";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";

import { getSnippet } from "@/firebase/functions";
import { ISnippet } from "@/types";

interface IExtension {
  [key: string]: LanguageSupport;
}

// page for share purpose only
export default function ShareableSnippet({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [snippet, setSnippet] = useState<ISnippet | null>(null);

  const extentions = useMemo<IExtension>(
    () => ({
      javascript: javascript({ jsx: true, typescript: true }),
      python: python(),
      cpp: cpp(),
      html: html({
        autoCloseTags: true,
        matchClosingTags: true,
        selfClosingTags: true,
      }),
      java: java(),
      php: php(),
    }),
    []
  );

  useEffect(() => {
    router.push(`/share/${params.id}`);
  }, [router, params.id]);

  useEffect(() => {
    const fetchSnippetData = async () => {
      if (params.id) {
        const response = await getSnippet(params.id);
        if (!response) return;
        setSnippet(response as ISnippet);
      }
    };

    fetchSnippetData();
  }, [params.id]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {snippet && (
        <div className="h-4/6 w-3/5 space-y-6">
          <div className="w-fit rounded-full bg-[#e2ebff] px-3 py-1">
            <span className="text-center text-sm font-normal text-[#325ddd]">
              {snippet.extension}
            </span>
          </div>
          <p className="text-sm font-normal text-slate-800">
            {snippet.description}
            lorem
          </p>
          <div className="h-full overflow-auto rounded-md bg-[#282828]">
            <CodeMirror
              editable={false}
              theme={vscodeDark}
              style={{ fontSize: 16 }}
              value={JSON.parse(snippet.code)}
              extensions={[extentions[snippet.extension]]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
