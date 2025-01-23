import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import "./App.css";

const defaultSource = `#include <iostream>

int main()
{
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`;

function App() {
  const srcRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const distRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [, setText] = useState<string | undefined>("");

  const addLineNumber = (raw: string) => {
    const lines = raw.split("\n");
    const nDigits = lines.length.toString().length; // 桁数
    return lines
      .map((line, i) => {
        return (i + 1).toString().padStart(nDigits, " ") + ":  " + line;
      })
      .join("\n");
  };

  const onSourceChange = (t: string | undefined) => {
    setText(t);
    if (distRef.current) {
      const model = distRef.current.getModel();
      model?.setValue(addLineNumber(t || ""));
    }
  };

  return (
    <>
      <div className="flex bg-gray-900">
        <div className="flex-1">
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
            onMount={(editor) => {
              srcRef.current = editor;
            }}
          />
        </div>
        <div className="flex-1">
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
    </>
  );
}

export default App;
