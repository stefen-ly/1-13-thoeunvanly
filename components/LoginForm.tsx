"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  loginSchema,
  LoginFormValues,
} from "@/features/auth/authSchema";

import { useLoginMutation } from "@/features/auth/authApi";

export default function LoginForm() {
  const [login, { isLoading }] =
    useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(
    values: LoginFormValues
  ) {
    try {
      const response = await login(values).unwrap();

      console.log(
        "Login successful:",
        response
      );

    } catch (error) {
      console.error(
        "Login failed:",
        error
      );
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>

        <CardDescription>
          Login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="username or email"
              className="text-sm font-medium"
            >
              Username or Email
            </label>

            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />

            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors.email
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium"
            >
              Password
            </label>

            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...form.register("password")}
            />

            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors.password
                    .message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading
              ? "Logging in..."
              : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
