import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getFinancialDetails } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useLoaderData } from "@remix-run/react";

import OutlinedCard from "../components/financialdetailscard";
import NavBar from "../components/NavBar";

export async function loader({ request }) {
  console.log("Loader function is being executed"); // Add this line
  const userId = await requireUserId(request);
  const financialDetails = await getFinancialDetails({ userId });
  return financialDetails;
}

export default function Example({ financialDetails }) {
  const data = useLoaderData();
  console.log({ data });
  return (
    <>
      <div className="min-h-full">
        <NavBar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome to your Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Your content */}
            <div>
              <OutlinedCard financialData={data} />
            </div>
            {/* Display financial details */}
            <div>
              <h2>Financial Details</h2>
              {data ? (
                <>
                  <p>ID: {data.id}</p>
                  <p>Balance: {data.balance}</p>
                  <p>Income: {data.income}</p>
                  <p>Savings: {data.savings}</p>
                  {/* Add more details as needed */}
                </>
              ) : (
                <p>No financial details available.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
