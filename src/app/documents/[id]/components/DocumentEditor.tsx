"use client";

import { Document } from "@prisma/client";
import dynamic from "next/dynamic";
import { OutputData } from "@editorjs/editorjs";
import { api } from "~/trpc/react";

const Editor = dynamic(() => import("~/components/editor/editor"), {
  ssr: false,
});

export function DocumentEditor(props: { document: Document }) {
  const { document } = props;

  const { mutate, error } = api.document.update.useMutation();

  const handleChange = (data: OutputData) => {
    mutate({
      id: document.id,
      content: JSON.stringify(data),
    });
  };

  let documentContent: any = document.content
  try{
    documentContent = JSON.parse(documentContent)
  } catch {
    documentContent = undefined
  }

  return <Editor onChange={handleChange} data={documentContent} />;
}
