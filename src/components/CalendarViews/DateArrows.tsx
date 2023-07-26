
interface props {
    handleDateChanger: (direction: string) => void;
}

export default function DateArrows({ handleDateChanger }: props ) {
  return (
    <div className="flex ml-4 ">
            <button
              onClick={() => handleDateChanger("left")}
              className="flex items-center justify-center h-10 w-10 mt-1 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-10 h-10 p-1 transition-colors duration-200 hover:bg-gray-800 rounded-full hover:bg-opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => handleDateChanger("right")}
              className="flex items-center justify-center h-10 w-10 mt-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-10 h-10 p-1 transition-colors duration-200 hover:bg-gray-800 rounded-full hover:bg-opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
  )
}
