import Link from "next/link";

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Image from "next/image";
import { Course as CourseType } from "@/payload-types";

async function getcourses(cat: string) {
	const payload = await getPayloadHMR({ config: configPromise })
	const courses = await payload.find({
		collection: 'courses',
	})
	return courses.docs as unknown as CourseType[]
}


export default async function Course({ params }: { params: { course: string } }) {
	const courses = await getcourses(params.course)
	return (
		<div className="md:max-w-7xl flex flex-col self-center items-start justify-center w-full">
			<div className="flex justify-center  w-full  p-14">
				<p className="text-5xl">{params.course}</p>
			</div>
			<div className="min-h-screen w-full ">
				<div className="grid grid-cols-12 p-4 gap-4 w-full flex-wrap">
					{courses && courses!?.map((course: CourseType) => {

						return (
							<div className={`col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 h-28 rounded-3xl  border-2 bg-[#${course.color}]`} key={course.id}>

								<a href={'/' + course.url}><p className={` text-white font-bold text-3xl uppercase`}>{course.title}</p></a>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}