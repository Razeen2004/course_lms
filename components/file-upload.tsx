"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter, OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";

interface FileUploadProps{
    onChange: (url?: string) => void
    endpoint: keyof typeof ourFileRouter
}

export const FileUpload = ({onChange, endpoint}: FileUploadProps) => {
    return <UploadDropzone endpoint={endpoint} onClientUploadComplete={(res)=>{onChange(res?.[0]?.url)}} onUploadError={(error: Error) => {
        toast.error("Something went wrong!");
    }} />
}