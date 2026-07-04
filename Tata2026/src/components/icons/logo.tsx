import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2 w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-primary"
        {...props}
      >
        <path d="M7 17a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H7z" />
        <path d="M17 17l-2-2" />
        <path d="M7 17l2-2" />
        <path d="M9 15l1-1" />
        <path d="M15 15l-1-1" />
        <path d="M9 12V7" />
        <path d="M15 12V7" />
      </svg>
      <span className="font-bold text-xl text-primary group-data-[collapsible=icon]:hidden">
        AutoWise
      </span>
    </div>
  );
}
