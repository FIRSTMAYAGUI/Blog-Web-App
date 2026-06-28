"use client"

import * as React from "react"
import Link from "next/link"
import { signUpSchema } from "@/app/schemas/auth"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTransition } from "react"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = React.useState<string | null>(null)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: SignUpFormValues) {
    setServerError(null)

    startTransition(async () => {
      const { error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      })

      if (error) {
        console.log('errror', error)
        setServerError(error.message ?? "Something went wrong. Please try again.")
        toast.error(error.message ?? "Something went wrong. Please try again.")
        return
      }

      toast.success("Account created successfully")
      router.push("/")
    })
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Sign up and start posting today
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-name">Full name</FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-name"
                    placeholder="James Smith"
                    autoComplete="name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-email"
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="sign-up-password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {serverError && (
              <p className="text-sm text-destructive">{serverError}</p>
            )}

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-4">
        <Button
          type="submit"
          form="sign-up-form"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : "Sign Up"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary underline-offset-4 hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
} 