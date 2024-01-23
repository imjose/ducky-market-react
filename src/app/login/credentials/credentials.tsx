"use client";

import React, { Fragment, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import clsx from "clsx";
import { credentialsAuth } from "@/app/lib/auth.actions";

export type SubmissionAction = "SignIn" | "SignUp";

export default function CredentialsForm() {
  const { pending } = useFormStatus();
  const [errorMessage, dispatch] = useFormState(credentialsAuth, undefined);
  const [submissionAction, setSubmissionAction] = useState<SubmissionAction>("SignIn");

  return (
    <Fragment>
      <form className="flex flex-col w-full" action={dispatch}>
        <div className={clsx("flex flex-col mb-3", { "hidden": submissionAction === "SignIn" })}>
          <label className="ml-1 text-zinc-500 font-light text-sm" htmlFor="name">
            Name
          </label>
          <input
            className="h-8 px-1 border bg-gray-50 hover:bg-gray-100 text-sm"
            name="name"
            type="text"
            placeholder="Scrooge McDuck"
            minLength={4}
            disabled={pending}
          />
        </div>
        <label className="ml-1 text-zinc-500 font-light text-sm" htmlFor="email">
          Email
        </label>
        <input
          className="h-8 px-1 border bg-gray-50 hover:bg-gray-100 text-sm"
          name="email"
          type="email"
          placeholder="ducky@store.com"
          disabled={pending}
        />
        <label className="ml-1 text-zinc-500 mt-3 font-light text-sm" htmlFor="password">
          Password
        </label>
        <input
          required
          className="h-8 px-1 border bg-gray-50 hover:bg-gray-100 text-sm"
          name="password"
          title="Password"
          type="password"
          minLength={6}
          disabled={pending}
        />
        <button
          className="mt-6 flex items-center justify-center rounded-md h-8 px-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white"
          type="submit"
          disabled={pending}
        >
          {pending
            ? submissionAction === "SignIn"
              ? "Login you in..."
              : "Creating User!"
            : submissionAction === "SignIn"
            ? "Sign In"
            : "Sign Up"}
        </button>
      </form>
      <button
        className={clsx("text-sm py-1", { "hidden": submissionAction === "SignUp" })}
        onClick={() => setSubmissionAction("SignUp")}
        type="button"
      >
        Sign up instead?
      </button>
      <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </Fragment>
  );
}
