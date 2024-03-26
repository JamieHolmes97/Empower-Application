import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import NavBar from "~/components/NavBar";
import { requireUserId } from "~/session.server";
import { createTip } from "~/models/tips.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const university = formData.get("universityName") as string;
  const message = formData.get("tipName") as string;

  await createTip({ name, university, message, userId });

  return redirect("/communitytips");
};

export default function AddCommunityTip() {
  return (
    <div className="min-h-full bg-gray-100">
      <NavBar />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Welcome to adding your own Community Tip</h2>
          <h3 className="text-1xl  mb-6">Simply add your tip below for others to view and share!</h3>
          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                What is your Name? *Optional*
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  autoFocus={true}
                  name="name"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                What University do you current attend?
              </label>
              <div className="mt-1">
                <input
                  id="university"
                  required
                  autoFocus={true}
                  name="universityName"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Please write the Tip you would like to share!
              </label>
              <div className="mt-1">
                <textarea
                  id="tip"
                  required
                  autoFocus={true}
                  name="tipName"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  rows={3}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Add Community Tip
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
