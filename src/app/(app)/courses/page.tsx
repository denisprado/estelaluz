import Link from "next/link";

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Image from "next/image";
import { Course as CourseType } from "@/payload-types";
import classNames from 'classnames';

async function getCourses(): Promise<CourseType[]> {
	const payload = await getPayloadHMR({ config: configPromise })
	const courses = await payload.find({
		collection: 'courses',
	})
	return courses.docs as unknown as CourseType[]
}


export default async function Course() {
	const courses = await getCourses()
	return (
		<div className="md:max-w-7xl flex flex-col self-center items-start justify-center w-full">
			<div className="flex justify-center  w-full  p-14">
				<p className="text-5xl">Cursos</p>
			</div>
			<div className="min-h-screen w-full ">
				<div className="grid grid-cols-12 gap-4 w-full flex-wrap">
					{courses && courses!?.map((course: CourseType) => {
						const bgColor = classNames('col-span-12 sm:col-span-6 md:col-span-4 rounded-3xl flex items-center justify-center border-4 p-4 h-[300px]')
						return (
							<div className={bgColor} key={course.id} style={{ backgroundColor: course.color }}>
								<a href={course.url} className={`text-white font-bold text-3xl uppercase text-center`}>{course.title}</a>
							</div>
						)
					})
					}
				</div>
			</div>
		</div>
	)
}