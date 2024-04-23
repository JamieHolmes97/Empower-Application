import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import NavBar from "~/components/NavBar";
import { requireUserId } from "~/session.server";
import { createTip } from "~/models/tips.server";
import { communityTipValidator } from "~/validation/validation";
import FormInput from "~/components/FormInput";
import { ValidatedForm } from "remix-validated-form";

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
          <ValidatedForm validator={communityTipValidator} method="post" className="space-y-6">
            <FormInput name="name" label="What is your Name? *Optional*" type="text" autoFocus />
            <FormInput name="universityName" label="What University do you currently attend?" type="text" />
            <FormInput name="tipName" label="Please write the Tip you would like to share!" type="textarea" rows={3} />
            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Add Community Tip
            </button>
          </ValidatedForm>
        </div>
      </div>
    </div>
  );
}
