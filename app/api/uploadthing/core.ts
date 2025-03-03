import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
    const authData = await auth();
    console.log("Auth Data:", authData); // Debugging
    if (!authData.userId) {
        throw new Error("Unauthorized!");
    }
    return { userId: authData.userId };
}

export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(handleAuth)
        .onUploadComplete(({ metadata, file }) => {
            console.log("Upload complete", file);
            console.log("Metadata:", metadata);
        }),
    
    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware(handleAuth)
        .onUploadComplete(({ metadata, file }) => {
            console.log("Upload complete", file);
        }),

    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "256MB" } })
        .middleware(handleAuth)
        .onUploadComplete(({ metadata, file }) => {
            console.log("Upload complete", file);
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
