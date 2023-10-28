import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";

import { Modal } from "flowbite-react";
import { ClipLoader } from "react-spinners";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { LanguageSupport } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { php } from "@codemirror/lang-php";
import { toast } from "react-toastify";

import useAuthStore from "@/store/useAuthStore";
import useModalStore from "@/store/useModalStore";
import { addSnippet, getSnippet, updateSnippet } from "@/firebase/functions";

interface IExtension {
  [key: string]: LanguageSupport;
}

const CustomModal = () => {
  const user = useAuthStore((state) => state.user);
  const {
    mode,
    isVisible,
    setVisible,
    selectedSnippetId,
    setSelectedSnippetId,
  } = useModalStore((state) => state);

  const isSaving = useRef<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [fontSize, setFontSize] = useState<string>("14px");
  const [description, setDescription] = useState<string>("");
  const [extension, setExtension] = useState<string>("javascript");

  const [loading, setLoading] = useState<boolean>(false);

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
    if ((mode === "edit" || mode === "view") && selectedSnippetId) {
      // fetch snippet data and set states
      const fetchSnippetData = async () => {
        if (user) {
          const response = await getSnippet(selectedSnippetId);
          if (response) {
            setCode(JSON.parse(response.code));
            setExtension(response.extension);
            setDescription(response.description);
          }
        }
      };

      fetchSnippetData();
    }
  }, [mode, selectedSnippetId, user]);

  const onChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onSubmit = async () => {
    if (!user) return;
    if (mode === "edit" && !selectedSnippetId) return;
    if (isSaving.current) return;

    isSaving.current = true;
    setLoading(true);

    if (mode === "edit" && selectedSnippetId) {
      const res = await updateSnippet(selectedSnippetId, code, description);
      if (res) {
        toast("Snippet Updated", {
          autoClose: 3000,
          type: "success",
          position: "top-center",
        });
      } else {
        toast("Something went wrong", {
          autoClose: 3000,
          type: "error",
          position: "top-center",
        });
      }
    } else if (mode === "create") {
      const res = await addSnippet(user?.uid, code, description, extension);
      if (res) {
        toast("Snippet Added", {
          autoClose: 3000,
          type: "success",
          position: "top-center",
        });
      } else {
        toast("Something went wrong", {
          autoClose: 3000,
          type: "success",
          position: "top-center",
        });
      }
    }

    setLoading(false);
    isSaving.current = false;
    setCode("");
    setExtension("javascript");
    setDescription("");
    setSelectedSnippetId(null);
    isVisible && setVisible(false);
  };

  const closeModal = () => {
    setCode("");
    setDescription("");
    setExtension("javascript");
    setSelectedSnippetId(null);
    setVisible(false);
  };

  return (
    <Modal
      size="4xl"
      show={isVisible}
      onClose={closeModal}
      root={document.body}
    >
      <div className="flex flex-col rounded-lg bg-[#282828]">
        <Modal.Header
          className="border-[#444444]"
          theme={{
            close: {
              base: "rounded-md p-1 hover:bg-[#444444] text-[#dddddd]",
            },
          }}
        >
          {mode === "view" ? (
            <h1 className="text-white font-semibold">Your code snippet</h1>
          ) : (
            <div className="flex flex-row items-center space-x-4">
              <span className="text-[#dddddd]">
                {mode === "edit" ? "Update Snippet" : "Add your Snippet"}
              </span>
              <select
                key={"extensions"}
                value={extension}
                defaultValue={extension}
                disabled={mode === "edit"}
                onChange={(event) => setExtension(event.target.value)}
                className="rounded-lg border-gray-600 bg-[#444444] p-1 px-2 text-sm text-white"
              >
                <option value="javascript">js</option>
                <option value="python">py</option>
                <option value="html">html</option>
                <option value="cpp">cpp</option>
                <option value="java">java</option>
                <option value="php">php</option>
              </select>
              <select
                key={"fontsizes"}
                defaultValue={fontSize}
                onChange={(event) => setFontSize(event.target.value)}
                className="rounded-lg border-gray-600 bg-[#444444] p-1 px-2 text-sm text-white"
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
              </select>
            </div>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="h-80 w-full overflow-auto rounded-md bg-[#282828]">
            <CodeMirror
              value={code}
              theme={vscodeDark}
              onChange={onChange}
              style={{ fontSize }}
              extensions={[extentions[extension]]}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="border-[#444444]">
          {mode === "view" ? (
            <p className="text-white/75 font-normal text-base">{description}</p>
          ) : (
            <div className="flex w-full flex-row items-center space-x-4">
              <button
                onClick={onSubmit}
                className="flex items-center justify-center rounded-md bg-[#304DFF] px-4 py-2 text-sm font-normal text-slate-50"
              >
                {loading ? (
                  <ClipLoader color="#eeeeee" size={18} />
                ) : mode === "edit" ? (
                  "update"
                ) : (
                  "save"
                )}
              </button>
              <input
                type="text"
                value={description}
                onChange={onChangeDescription}
                className="
                    w-full rounded-md bg-[#484747] text-sm font-normal text-slate-50 placeholder:text-[#ababab] 
                    focus:border-[#504d4d] focus:ring-[#504d4d]
                "
                placeholder="Enter a short description..."
              />
            </div>
          )}
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default CustomModal;
