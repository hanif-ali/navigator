"use client";

import DatabaseIcon from "~/icons/svg/database.svg";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";

export function NavBar() {
  return (
    <header className="h-10 flex item-center w-full border-b fixed bg-background/90 backdrop-blur px-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <a className="mr-6 flex items-center space-x-2" href="/">
              <DatabaseIcon />
              <span className="hidden font-bold sm:inline-block">
                navigator
              </span>
            </a>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="#" legacyBehavior passHref>
              <NavigationMenuLink>
                Explorer
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
