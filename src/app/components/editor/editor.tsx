import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./editor-tools";

interface Props {
  holder?: string;
  data?: OutputData;

  onChange: (data: OutputData) => void;
}

export default function Editor(props: Props) {
  const { data, onChange } = props;
	const holder = props.holder ?? "generate-random-id-here"

  const ref = useRef<EditorJS>();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
        defaultBlock: 'paragraph',
        placeholder: 'begin writing...'
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={holder} className="prose max-w-full" />;
}
