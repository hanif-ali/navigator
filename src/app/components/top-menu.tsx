import Link from "next/link";
import { IconNotes, IconUsersGroup, IconSettings } from "@tabler/icons-react";

export function TopMenu() {
  return (
    <>
      <Link className="my-4 text-white" href="/documents/">
        <IconNotes />
        <span className="sr-only">Notes</span>
      </Link>
      <Link className="my-4 text-white" href="#">
        <IconUsersGroup />
        <span className="sr-only">Community</span>
      </Link>
      <Link className="my-4 text-white" href="#">
        <IconSettings />
        <span className="sr-only">Settings</span>
      </Link>
    </>
  );
}
