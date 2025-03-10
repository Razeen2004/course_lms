"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormItem, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
    initialData: Course
    courseId: string
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required"
    })
})

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: initialData?.imageUrl || ''
        }
    });

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course Updated!");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong!");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Image
                <Button onClick={toggleEdit} variant="ghost">

                    {isEditing && (
                        <>Cancel</>
                    )}

                    {!isEditing && !initialData?.imageUrl && (
                        <>
                            <PlusCircle />
                            Add an Image
                        </>
                    )}

                    {!isEditing && initialData?.imageUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Image
                        </>
                    )}
                </Button>
            </div>
            <div>

                {!isEditing && (
                    !initialData?.imageUrl ? (
                        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                            <ImageIcon className="h-10 w-10 text-slate-500" />
                        </div>
                    ) : (
                        <div className="mt-2 relative aspect-video">
                            <Image alt="Upload" fill className="object-cover rounded-md" src={initialData?.imageUrl} />
                        </div>
                    )
                )}

                {isEditing && (
                    <div>
                        <FileUpload endpoint="courseImage" onChange={(url)=> {
                            if(url){
                                onSubmit({imageUrl: url})
                            }
                        }}/>
                        <div className="text-xs text-muted-foreground mt-4">
                            16:9 aspect ratio recommended
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageForm;