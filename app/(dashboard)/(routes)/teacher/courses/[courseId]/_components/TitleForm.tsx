"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormItem, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TitleFormProps {
    initialData: {
        title: string
    }
    courseId: string
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    })
})

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current)=> !current);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course Updated!");
            toggleEdit();
            router.refresh();
        }catch{
            toast.error("Something went wrong!");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Title
                <Button onClick={toggleEdit} variant="ghost">

                    {isEditing && (
                        <>Cancel</>
                    )}

                    {!isEditing && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit title
                        </>
                    )}
                </Button>
            </div>
            <div>
                {!isEditing ? (
                    <p className="text-sm mt-2">{initialData.title}</p>
                ): (
                    <Form {...form}>
                        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="title" render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="e.g. 'Advanced Web Development'" disabled={isSubmitting} {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} />
                            <div className="flex items-center gap-x-2">
                                <Button disabled={isSubmitting} type="submit">Save</Button>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
        </div>
    );
}

export default TitleForm;