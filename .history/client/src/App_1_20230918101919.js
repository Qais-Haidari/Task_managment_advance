import { Link } from "react-router-dom";
export default function Example() {
  return (
    <div className="">
      <nav class="flex items-center justify-between flex-wrap p-6 bg-[#1b365d]">
        <div class="w-full block lg:flex-grow sm:flex sm:justify-between  lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <div className="lg:block">
              <Link to="/tasklist">
                <p class="block mt-4 lg:inline-block sm:inline lg:mt-0 text-white hover:text-white mr-4 lg:text-sm sm:text-lg">
                  My Task
                </p>
              </Link>
            </div>
            <div className="sm:hidden lg:block">
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
              {/* <Link to="/Countdown">
                <p class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                  CountDown
                </p>
              </Link> */}
            </div>
          </div>
          <div className="sm:-mt-6">
            <img
              alt="LOGO"
              src={require("./logo (1).jpg")}
              className="lg:w-32 sm:w-32 mr-2 sm:mt-4 sm: rounded-md"
            />
          </div>
          <div className="sm:-mt-6">
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
