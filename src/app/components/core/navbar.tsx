"use client";

import { IconDatabase } from "@tabler/icons-react";

import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "~/app/components/ui/navigation-menu";

export function NavBar() {
  return (
    <header className="item-center fixed flex h-10 w-full border-b bg-background/50 z-10 px-4 backdrop-blur">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <a className="mr-6 flex items-center space-x-2" href="/">
              <IconDatabase />
              <span className="hidden font-bold sm:inline-block">
                navigator
              </span>
            </a>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
