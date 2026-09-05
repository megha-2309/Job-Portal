"use server";

import { eq, or } from "drizzle-orm";
import argon2 from "argon2";

import { db } from "@/src/config/db";
import { users } from "@/src/drizzle/schema";
import { loginUserSchema, registerUserSchema } from "../auth.schema";
import { createSessionAndSetCookies, invalidateSession } from "./use-cases/sessions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto"


export const registerationUserAction = async (data: {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: "applicant" | "employer";
}) => {
  try {
    const { data: validatedData, error } = registerUserSchema.safeParse(data);

    if (error) return { status: "ERROR", message: error.issues[0].message };
    const { name, userName, email, password, role } = validatedData;

    const [user] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.userName, userName)));

    if (user) {
      if (user.email === email) {
        return {
          status: "ERROR",
          message: "Email already exists",
        };
      } else {
        return {
          status: "ERROR",
          message: "UserName already exists",
        };
      }
    }

    const hashPassword = await argon2.hash(password);

    const [result] = await db.insert(users).values({
      name,
      userName,
      email,
      password: hashPassword,
      role,
    });

    console.log(result);

    // const [createdUser] = await db
    //   .select()
    //   .from(users)
    //   .where(eq(users.email, email));

    // if (!createdUser) {
    //   return {
    //     status: "ERROR",
    //     message: "User creation failed",
    //   };
    // }

    await createSessionAndSetCookies(result.insertId);

    return {
      status: "SUCCESS",
      message: "Account created successfully",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Unknown Error Occured! Please Try Again Later",
    };
  }
};

type LoginData = {
  email: string;
  password: string;
};

export const loginUserAction = async (data: LoginData) => {
  try {
    const {data:validatedData, error} = loginUserSchema.safeParse(data);
    if(error) return {status:"ERROR" ,message:error.issues[0].message};

    const { email, password } = validatedData;

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return {
        status: "ERROR",
        message: "Invalid Email or Password",
      };
    }

    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
      return {
        status: "ERROR",
        message: "Invalid Email or password",
      };
    }

    await createSessionAndSetCookies(user.id);

    return {
      status: "SUCCESS",
      message: "Login Successful",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Unknown Error Occured! Please Try Again Later",
    };
  }
};




 
export const logoutUserAction = async() =>{
        const cookieStore = await cookies();
        const session = cookieStore.get("session")?.value;


        if(!session) return redirect("/login")
        
        const hashedToken = crypto.createHash("sha-256").update(session).digest("hex");

        await invalidateSession(hashedToken);
      
        cookieStore.delete("session");

        return redirect('/login');
}