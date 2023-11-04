"use client";
import { useDebouncedCallback } from "use-debounce";

import { Document } from "@prisma/client";
import dynamic from "next/dynamic";
import { OutputData } from "@editorjs/editorjs";
import { api } from "~/trpc/react";
import { Separator } from "~/components/ui/separator";
import { EditableInput } from "~/components/editor/editable-input";
import { IconSelector } from "~/components/documents/icon-selector";
import { Emoji } from "~/utils/emojis";
import { useState } from "react";

const Editor = dynamic(() => import("~/components/editor/editor"), {
  ssr: false,
});

export function DocumentEditor(props: { document: Document }) {
  const [document, setDocument] = useState(props.document);

  const { mutate } = api.document.update.useMutation({
    onMutate: (data) => {
      setDocument((docBefore) => ({
        id: docBefore.id,
        name: data.name ?? docBefore.name,
        icon: data.icon ?? docBefore.icon,
        content: data.content ?? docBefore.content,
        createdAt: docBefore.createdAt,
        updatedAt: docBefore.updatedAt,
      }));
    },
  });

  const updateTitleDebounced = useDebouncedCallback((newTitle) => {
    mutate({ id: document.id, name: newTitle });
  }, 1000);

  const handleContentChange = (data: OutputData) => {
    mutate({
      id: document.id,
      content: JSON.stringify(data),
    });
  };

  const handleIconChange = (emoji: Emoji) => {
    mutate({
      id: document.id,
      icon: emoji.emoji,
    });
  };

  let documentContent: any = document.content;
  try {
    documentContent = JSON.parse(documentContent);
  } catch {
    documentContent = undefined;
  }

  return (
    <div>
      <div className="flex">
        <IconSelector value={document.icon} onChange={handleIconChange} />
        <EditableInput
          value={document.name}
          onChange={updateTitleDebounced}
          className="px-2 text-xl"
        />
      </div>
      <Separator className="my-2 text-2xl" />
      <div className="px-2">
        <Editor onChange={handleContentChange} data={documentContent} />
      </div>
    </div>
  );
}
