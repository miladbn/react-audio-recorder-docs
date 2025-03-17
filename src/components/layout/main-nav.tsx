"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export function MainNav() {
  const pathname = usePathname();

  const items: NavItem[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Getting Started",
      href: "/docs/getting-started",
    },
    {
      title: "API Reference",
      href: "/docs/api-reference",
    },
    {
      title: "Examples",
      href: "/docs/examples",
    },
    {
      title: "Advanced Usage",
      href: "/docs/advanced-usage",
    },
  ];

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          react-audio-recorder-hook
        </span>
      </Link>
      <nav className="flex gap-6">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground" : "text-foreground/60",
              item.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
