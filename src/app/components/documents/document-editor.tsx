"use client";
import { useDebouncedCallback } from "use-debounce";

import { Document } from "@prisma/client";
import dynamic from "next/dynamic";
import { api } from "~/trpc/react";
import { Separator } from "~/app/components/ui/separator";
import { EditableInput } from "~/app/components/editor/editable-input";
import { IconSelector } from "~/app/components/documents/icon-selector";
import { Emoji } from "~/utils/emojis";
import { useState } from "react";

const Editor = dynamic(() => import("~/app/components/editor/editor"), {
  ssr: false,
});

export function DocumentEditor(props: { document: Document }) {
  const [document, setDocument] = useState(props.document);

  const { mutate } = api.document.update.useMutation();

  const updateTitleDebounced = useDebouncedCallback((newTitle) => {
    mutate({ id: document.id, name: newTitle });
  }, 1000);

  const handleContentChange = (data: any) => {
    mutate({
      id: document.id,
      content: data,
    });
  };

  const handleIconChange = (emoji: Emoji) => {
    setDocument((doc) => ({ ...doc, icon: emoji.emoji }));
    mutate({
      id: document.id,
      icon: emoji.emoji,
    });
  };

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
        <Editor onChange={handleContentChange} data={document.content as any} />
      </div>
    </div>
  );
}
