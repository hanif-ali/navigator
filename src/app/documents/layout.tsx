import Link from "next/link";
import { ReactNode } from "react";
import { DocumentsMenu } from "../components/documents/documents-menu";

export default function DocumentsPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-row">
      <DocumentsMenu />
      <div className="flex-1">{children}</div>
    </div>
  );
}
