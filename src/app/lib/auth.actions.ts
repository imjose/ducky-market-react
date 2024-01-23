"use server";

import { signIn, signOut } from "./auth";
import { AuthError } from "next-auth";
import bcryptjs from "bcryptjs";

import { z } from "zod";
import prisma from "./db";

class SignUpUserError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export async function userSignOut() {
  await signOut();
}

async function generateUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const parsedCredentials = z
    .object({ name: z.string().min(4), email: z.string().email(), password: z.string().min(6) })
    .safeParse({ name, email, password });

  if (!parsedCredentials) throw new SignUpUserError("Invalid Credentials.");

  const encriptedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.create({
    data: { email, name, password: encriptedPassword },
  });
}

export async function credentialsAuth(prevState: string | undefined, formData: FormData) {
  try {
    if ((formData.get("name") as string)?.length) {
      await generateUser(formData);
    }

    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    if (error instanceof SignUpUserError) {
      return error.message;
    }
    throw error;
  }
}
