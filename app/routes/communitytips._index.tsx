import { Link } from "@remix-run/react";
import NavBar from "~/components/NavBar";

export default function CommunityTips() {
  return (
    <div className="min-h-full">
      <NavBar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Community Tips
          </h1>
        </div>
      </header>

      <Link
        to="/communitytips/addtip"
        className="block w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 text-center"
      >
        Add Community Tip
      </Link>
    </div>
  );
}
