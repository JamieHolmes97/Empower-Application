import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Empower" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://i.pinimg.com/564x/04/55/31/045531ff30769b98f0ffafd58b51f526.jpg"
                alt="Eagle"
              />
              {/* <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" /> */}
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-blue-500 drop-shadow-md">
                  Empower
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                An application developed to empower students financial and
                redirect their sole focus towards their dreams
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                  >
                    View Dashboard for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <div className="mt-6 bg-black p-6 rounded-lg shadow-md">
            <div className="flex flex-wrap justify-center gap-8">
              {[
                {
                  title: "Tracking and Monitoring",
                  description:
                    "Track and Monitor your expenses in a visually pleasing manner allowing you to grasp a picture of your finances",
                },
                {
                  title: "Budgeting",
                  description:
                    "Have the ability to create Budgets and allocate your spending into various categories to help manage your spending and saving ",
                },
                {
                  title: "Financial Goals",
                  description:
                    "Have a goal in mind? Maybe saving for something you need.... or desire? With custom goals you will be able to manage saving towards these goals ",
                },
                {
                  title: "Community Tips",
                  description:
                    "Always wanted to gain some helpful financial tips and tricks from fellow students? Well now you can with integrated community tips and tricks posted by you",
                },
              ].map((card, index) => (
                <a
                  key={index}
                  className="flex flex-col h-48 w-64 justify-center p-4 bg-white rounded-lg shadow-md transition hover:shadow-lg focus:shadow-lg"
                >
                  <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
                  <p className="text-sm">{card.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
