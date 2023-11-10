import { IconLoader2 } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";
import { cn } from "~/lib/utils";

type Props = {
  className?: string;
};
export function Loading(props: Props) {
  const { className = "" } = props;
  return <IconLoader2 className={twMerge("h-6 w-6 animate-spin", className)} />;
}
