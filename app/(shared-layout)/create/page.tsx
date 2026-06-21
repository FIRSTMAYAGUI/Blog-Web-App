"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { postSchema, PostFormValues } from "@/app/schemas/postShema"; 
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
/* import { createBlogAction} from "@/app/actions/createBlogAction"; */

export default function Create() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
   const mutatePost = useMutation(api.mutations.posts.createBlog);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: PostFormValues){
    mutatePost({ title: values.title, content: values.content })
  }

  /* function onSubmit(values: PostFormValues) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("image", values.image);

      const result = await createBlogAction(formData);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Post created successfully");
      router.push("/blog");
    });
  } */

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts with the big world
        </p>
      </div>

      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="post-title">Title</FieldLabel>
                    <Input
                      id="post-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="super cool title"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="post-content">Content</FieldLabel>
                    <Textarea
                      id="post-content"
                      aria-invalid={fieldState.invalid}
                      placeholder="Super cool blog content"
                      rows={8}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* <Controller
                name="image"
                control={form.control}
                render={({ field: { value, onChange, ...field }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="post-image">Image</FieldLabel>
                    <Input
                      id="post-image"
                      aria-invalid={fieldState.invalid}
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        onChange(file);
                      }}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              /> */}

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Create Post</span>
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}