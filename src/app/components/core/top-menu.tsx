import Link from "next/link";
import { IconNotes, IconSettings, IconTopologyStar3 } from "@tabler/icons-react";

export function TopMenu() {
  return (
    <>
      <Link className="my-4 text-white" href="/documents/">
        <IconNotes />
        <span className="sr-only">Documents</span>
      </Link>
      <Link className="my-4 text-white" href="/data-sources/">
        <IconTopologyStar3 />
        <span className="sr-only">Data Sources</span>
      </Link>
      <Link className="my-4 text-white" href="#">
        <IconSettings />
        <span className="sr-only">Settings</span>
      </Link>
    </>
  );
}
