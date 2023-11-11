"use client";

import { Button } from "~/app/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/components/ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { emojis, Emoji } from "~/utils/emojis";
import clsx from "clsx";

interface Props {
  value: string;
  onChange: (value: Emoji) => void;
}

export function IconSelector(props: Props) {
  const { value, onChange } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[300px] w-80">
        <div>
          <h4 className="font-medium leading-none">Select Icon</h4>
        </div>
        <ScrollArea className="mt-6 h-[200px] w-full">
          <div className="grid grid-cols-8 gap-2">
            {emojis.map((emoji, idx) => (
              <div
                className={clsx(
                  "cursor-pointer rounded-md text-center hover:bg-slate-500",
                  {
                    "border-blue-500": emoji.emoji === value,
                  },
                )}
                onClick={() => onChange(emoji)}
                key={idx}
              >
                {emoji.emoji}
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
