
import PageContainer from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { Course as CourseType } from "@/payload-types";
import configPromise from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
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
		<PageContainer>
			<PageTitle>Cursos</PageTitle>
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
		</PageContainer>
	)
}