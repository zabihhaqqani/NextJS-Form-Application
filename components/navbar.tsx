import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-gray-700 p-4 w-full">
      <ul className="flex justify-end space-x-4">
        <Link href="/">
          <p className="text-white hover:text-gray-300">Home</p>
        </Link>
        <Link href="/admin">
          <p className="text-white hover:text-gray-300">Admin</p>
        </Link>
      </ul>
    </nav>
  )
}

export default Navbar
