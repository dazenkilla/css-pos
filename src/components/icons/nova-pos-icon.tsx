import type { SVGProps } from "react";

export function NovaPosIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 21h10" />
      <path d="M12 21V7" />
      <path d="M7 7l5-5 5 5" />
      <path d="M3 7h18" />
    </svg>
  );
}
