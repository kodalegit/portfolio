function NavBar() {
  return (
    <nav className="bg-white/30 backdrop-blur-lg w-full fixed top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a className="text-black font-bold text-xl">My Portfolio</a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>

              <a className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                Projects
              </a>

              <a className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                Experience
              </a>

              <a className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                Contacts
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
