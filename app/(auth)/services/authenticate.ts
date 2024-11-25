"use server";

import { signIn, signOut } from "@/app/(auth)/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("microsoft-entra-id", formData);
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      return "Something went wrong with Azure AD authentication.";
    }
    throw error;
  }
}

export async function deauthenticate(): Promise<void> {
  await signOut();
}
