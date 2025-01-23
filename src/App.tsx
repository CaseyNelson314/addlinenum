import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import FloatingLink from "./FloatingLink";
import "./App.css";

const defaultSource = `#include <iostream>

int main()
{
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`;

function App() {
  const distRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [, setText] = useState<string | undefined>("");

  const addLineNumber = (raw: string) => {
    const lines = raw.split("\n");
    const nDigits = Math.floor(Math.log10(lines.length)) + 1;
    return lines
      .map((line, i) => {
        return (i + 1).toString().padStart(nDigits, " ") + ":  " + line;
      })
      .join("\n");
  };

  const onSourceChange = (t: string | undefined) => {
    setText(t);
    const model = distRef.current?.getModel();
    model?.setValue(addLineNumber(t || ""));
  };

  return (
    <>
      <div className="flex bg-gray-900 overflow-hidden">
        <div className="flex-1 overflow-hidden m-100">
          <Editor
            height="100vh"
            width="100%"
            defaultLanguage="cpp"
            defaultValue={defaultSource}
            theme="vs-dark"
            options={{
              lineNumbers: "off",
              minimap: { enabled: false },
              folding: false,
              tabSize: 4,
            }}
            onChange={onSourceChange}
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <Editor
            height="100vh"
            width="100%"
            defaultLanguage="cpp"
            defaultValue=""
            theme="vs-dark"
            options={{
              readOnly: true,
              lineNumbers: "off",
              minimap: { enabled: false },
              folding: false,
            }}
            onMount={(editor) => {
              distRef.current = editor;
              onSourceChange(defaultSource);
            }}
          />
        </div>
      </div>
      <FloatingLink icon="github.png" url="https://github.com/CaseyNelson314/addlinenum" />
    </>
  );
}

export default App;
