import React from "react";
interface props {
    width: number,
    height: number
}

export default function LeftArrowSvg({width, height}: props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="white"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevron-left-square stroke-slate-300 fill-slate-800"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <polyline points="14,16 10,12 14,8" />
    </svg>
  );
}
