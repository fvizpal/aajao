
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t font-mono flex justify-center items-center lg:mx-auto p-4 md:px-10 w-full gap-4 text-center">
      <div>
        All right reserved.
      </div>
      <Link
        href={"https://github.com./fvizpal"}
        target="__blank"
      >
        @fvizpal
      </Link>
    </footer>
  )
}

export default Footer