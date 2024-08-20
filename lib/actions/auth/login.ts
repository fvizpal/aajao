"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";

// import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import {
  sendVerificationEmail,
  // sendTwoFactorTokenEmail,
} from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  generateVerificationToken,
  // generateTwoFactorToken
} from "@/lib/actions/auth/token";
// import {
//   getTwoFactorConfirmationByUserId
// } from "@/data/two-factor-confirmation";
import { getUserByEmail } from "@/lib/data/user";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    const token = verificationToken.token;
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    const emailContent = {
      subject: 'Email verification | From Fassal',
      body: `
        <div>
          <h2>Welcome to Aajao 🚀</h2>
          <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
            <h3>Email Verification</h3>
            <p>Verify your email to successfully login. Click on the following link</p>
            <a href="${confirmLink}" target="_blank" rel="noopener noreferrer">Link</a>!</p>
          </div>
        </div>
      `,
    }

    await sendVerificationEmail(emailContent, verificationToken.email);

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
};
