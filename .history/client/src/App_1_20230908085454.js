import { Link, Redirect } from "react-router-dom";
export default function Example() {
  return (
    <div className="bg-green-600">
      <nav class="flex items-center justify-between flex-wrap bg-blue-600 p-6">
        <div class="block md: lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <Link to="/tasklist">
              <p class="block mt-4 lg:inline-block sm:inline lg:mt-0 text-white hover:text-white mr-4">
                My Task
              </p>
            </Link>
            <Link to="/admin">
              <p class="block mr-2 mt-4  lg:inline-block lg:mt-0 text-white hover:text-white mr  -4">
                Admin
              </p>
            </Link>
            <Link to="/dashboard">
              <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                Dashboard
              </p>
            </Link>
            {/* <Link to="/leaderboard">
              <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                LeaderBorad
              </p>
            </Link> */}
            <Link to="/Customize">
              <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                Customize
              </p>
            </Link>
            <Link to="/Report">
              <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                Report
              </p>
            </Link>
            <Link to="/PrimaryTask">
              <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                Primary Tasks
              </p>
            </Link>
            <Link to="/Countdown">
              <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                CountDown
              </p>
            </Link>
          </div>
          <div>
            <Link to="/profile">
              <p class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                Profile
              </p>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
