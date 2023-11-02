import Link from "next/link";
import { ReactNode } from "react";
import DocumentsMenu from "./components/documents-menu";

export default function DocumentsPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-row min-h-screen">
			<DocumentsMenu />
			<div className="flex-1">
				{children}
			</div>
    </div>
  );
}
