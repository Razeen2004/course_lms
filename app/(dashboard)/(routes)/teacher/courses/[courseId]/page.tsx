import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import TitleForm from "./_components/TitleForm";
import React from "react";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
    const userId = await auth();
    const { courseId }: any = await params;

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId
        }
    })

    if (!course) {
        return redirect('/');
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    return (<div className="p-6">
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-xl font-medium">Course Setup</h1>
                <span className="text-sm text-slate-700">Complete all Fields: {completionText}</span>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
                <div className="flex items-center gap-x-2">
                    <h2 className="text-xl">Customize your Course</h2>
                </div>
                <TitleForm courseId={course.id} initialData={course} />
                <DescriptionForm courseId={course.id} initialData={course} />
                <ImageForm courseId={course.id} initialData={course} />
            </div>
        </div>
    </div>);
}

export default CoursePage;