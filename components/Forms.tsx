"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  setname: z.string().min(4, {
    message: "Setname must be at least 4 characters.",
  }),
  term: z.string().min(1, {
    message: "Term must be at least 1 character.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 character.",
  }),
})

interface ProfileFormProps {
  setname?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ setname }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onsubmit = async (data: any) => {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.error('Form submission failed');
      alert('Form submission failed');
      return;
    }

    // If successful, redirect to set page
    console.log('Form submitted successfully');
  };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8 ">
          {setname && (
            <FormField
              control={form.control}
              name="setname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Setname</FormLabel>
                  <FormControl>
                    <Input placeholder="MySet" {...field} defaultValue="" />
                  </FormControl>
                  <FormDescription>
                    This is your set's name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term</FormLabel>
                <FormControl>
                  <Input placeholder="Apple" {...field} defaultValue="" />
                </FormControl>
                <FormDescription>
                  This is your first term.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="The round fruit of a tree of the rose family"
                    {...field}
                    defaultValue=""
                  />
                </FormControl>
                <FormDescription>
                  This is your corresponding definition.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="border border-white hover:border-2 w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
  )
}

export default ProfileForm;