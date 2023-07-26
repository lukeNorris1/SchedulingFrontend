interface props {
    width: number,
    height: number
}

export default function RightArrowSvg({width, height}: props) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-left-square stroke-slate-300 fill-slate-800"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <polyline points="10,8 14,12 10,16" />
  </svg>
  )
}
