import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const { title } = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized ID", {status: 500});
        }

        const course = await db.course.create({
            data: {
                userId,
                title: title
            }
        });

        return NextResponse.json(course);

    } catch {
        console.log("[COURSES]");
        return new NextResponse("Internal Error", { status: 500 })
    }
}