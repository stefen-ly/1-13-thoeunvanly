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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  registerSchema,
  RegisterFormValues,
} from "@/features/auth/authSchema";

import { useRegisterMutation } from "@/features/auth/authApi";

export default function RegisterForm() {
  const [registerUser, { isLoading }] =
    useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
      dateOfBirth: "",
    },
  });

  async function onSubmit(
    values: RegisterFormValues
  ) {
    try {
      const response = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth,
      }).unwrap();

      console.log(
        "Registration successful:",
        response
      );
    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create account</CardTitle>

        <CardDescription>
          Create a new account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium"
            >
              Name
            </label>

            <Input
              id="name"
              placeholder="Koko Ly"
              {...form.register("name")}
            />

            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium"
            >
              Email
            </label>

            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />

            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label
              htmlFor="gender"
              className="text-sm font-medium"
            >
              Gender
            </label>

            <Select
              value={form.watch("gender")}
              onValueChange={(value) =>
                form.setValue(
                  "gender",
                  value as RegisterFormValues["gender"],
                  {
                    shouldValidate: true,
                  }
                )
              }
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="male">
                  Male
                </SelectItem>

                <SelectItem value="female">
                  Female
                </SelectItem>

                <SelectItem value="other">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>

            {form.formState.errors.gender && (
              <p className="text-sm text-red-500">
                {form.formState.errors.gender.message}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label
              htmlFor="dateOfBirth"
              className="text-sm font-medium"
            >
              Date of Birth
            </label>

            <Input
              id="dateOfBirth"
              type="date"
              {...form.register("dateOfBirth")}
            />

            {form.formState.errors.dateOfBirth && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors.dateOfBirth
                    .message
                }
              </p>
            )}
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium"
            >
              Confirm Password
            </label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...form.register("confirmPassword")}
            />

            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {
                  form.formState.errors.confirmPassword
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
              ? "Creating account..."
              : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
