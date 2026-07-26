"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  if (pathname === "/" || pathname.startsWith("/admin")) {
    return null;
  }
  
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  
  return (
    <div className="w-full bg-[#030303] border-b border-white/5 py-4">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <nav className="flex items-center text-[11px] font-body uppercase tracking-widest text-brand-grey">
          <Link href="/" className="hover:text-brand-saffron transition-colors">
            Home
          </Link>
          
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;
            const formattedSegment = segment.replace(/-/g, " ");
            
            return (
              <React.Fragment key={path}>
                <ChevronRight size={14} className="mx-2 opacity-50" />
                {isLast ? (
                  <span className="text-white font-medium">{formattedSegment}</span>
                ) : (
                  <Link href={path} className="hover:text-brand-saffron transition-colors">
                    {formattedSegment}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
