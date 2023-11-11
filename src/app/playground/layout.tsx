import { ReactNode } from "react";
import { DocumentsMenu } from "../components/documents/documents-menu";

export default function PlaygroundPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-row">
      <div className="flex-1">{children}</div>
    </div>
  );
}
