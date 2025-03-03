import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {courseId: string}}){
    try{
        const {userId} = await auth();
        
        if(!userId){
            return new NextResponse("Unauthorized!", {status: 401})
        }

        const {courseId} = params;
        const values = await req.json();
        const courseData:any = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values
            }
        });

        return new NextResponse(courseData);
    }catch(error){
        return new NextResponse("Internal Error" + error, {status: 400});
    }
}