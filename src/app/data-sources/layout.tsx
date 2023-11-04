import Link from "next/link";
import { ReactNode } from "react";
import { DataSourcesMenu } from "./components/data-sources-menu";

export default function DocumentsPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-row">
      <DataSourcesMenu />
      <div className="flex-1">{children}</div>
    </div>
  );
}
