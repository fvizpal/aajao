"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/database";
import { RegisterSchema } from "@/schemas";

import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/lib/data/user";
import { generateVerificationToken } from "./token";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  const token = verificationToken.token;
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const emailContent = {
    subject: 'Email verification | From Aajao',
    body: `
      <div>
        <h2>Welcome to Fassal 🚀</h2>
        <div>
          <h3>Email Verification</h3>
          <p>Verify your email to successfully login. Click on the following link</p>
          <a href="${confirmLink}" target="_blank" rel="noopener noreferrer">Link</a>!</p>
        </div>
      </div>
    `,
  }

  await sendVerificationEmail(emailContent, verificationToken.email);

  return { success: "Confirmation email sent!" };
};
