"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
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


// Purpose:Creates the fields in the form that the user can edit
const formSchema = z.object({
  term: z.string().min(1, {
    message: "Term must be at least 1 character.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 character.",
  }),
})

//Props for the EditForms component that allows the setName to be passed in as a prop
//This is used to identify which set the user is editing
interface AddTermsProps {
    setName: string | string[] | undefined;
  }
  

const AddTerms: React.FC<AddTermsProps> = ({ setName }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [successfulSubmit,setSuccessfulSubmit] = useState(false);

// the onsubmit function is called when the user submits the form and sends a POST request to the mongoDB database
  const onsubmit = async (data: any) => {
    const {term, description} = data;
    
    const response = await fetch('/api/addterms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ setName, term, description })
    });

    if (!response.ok) {
      setSuccessfulSubmit(false);
      return;
    }

    // If successful, pops up a message that says it was successful
    setSuccessfulSubmit(true);
  };



  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8 text-black ">
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
          <Button className="border border-black hover:border-2 w-full" type="submit">
            Add
          </Button>
        </form>
        {successfulSubmit && <p className="text-black">Successfully edited set!</p>}
      </Form>

  )
}

export default AddTerms;