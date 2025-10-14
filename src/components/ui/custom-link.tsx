"use client";

import Link, { LinkProps } from "next/link";
import { useLoading } from "@/components/ui/loading-provider";
import { usePathname } from "next/navigation";
import React from "react";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function CustomLink({ children, href, className, ...props }: CustomLinkProps) {
  const { setLoading } = useLoading();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't show loading for the same page or for anchor links
    if (href === pathname || href.toString().startsWith("#")) {
      return;
    }
    setLoading(true);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
