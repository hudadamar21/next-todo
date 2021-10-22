import Link from "next/link";

function BackButton() {
  return (
    <Link href="/">
      <div className="h-10 w-10 rounded-full hover:bg-gray-200 cursor-pointer" data-cy="todo-back-button">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.6665 16L14.6665 24" stroke="#111111" strokeWidth="5" strokeLinecap="square"/>
          <path d="M6.6665 16L14.6665 8" stroke="#111111" strokeWidth="5" strokeLinecap="square"/>
        </svg>
      </div>
    </Link>
  )
}

export default BackButton