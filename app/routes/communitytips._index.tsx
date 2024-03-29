import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import NavBar from "~/components/NavBar";
import { requireUserId } from "~/session.server";
import { getAllTips, getTipsByUserId } from "~/models/tips.server";
import TipsDetailsCard from "../components/TipsDetailsCard"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);

  const allTips = await getAllTips()
  const userTips = await getTipsByUserId(userId)

  return {allTips, userTips}
}

export default function CommunityTips() {

  const tipsData = useLoaderData<typeof loader>();
  console.log(tipsData)
  
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
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1>Here you will view and share Tips from other students! </h1>
      </div>

      <Link
        to="/communitytips/addtip"
        className="block w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 text-center"
      >
        Add Community Tip
      </Link>

      <TipsDetailsCard tipsData={null} userTipsData={null} /> 

      
    </div>
  );
}
