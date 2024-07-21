
import PageContainer from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { getUrl } from "@/helpers/functions";
import imageLoader from "@/helpers/loader";
import { Profile } from '@/payload-types';
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import Image from "next/image";
import TextLink from "@/components/TextLink";

async function getProfile(): Promise<Profile> {
	const payload = await getPayloadHMR({ config })
	const courses = await payload.find({
		collection: 'profile',
		limit: 1
	})
	return courses.docs[0] as unknown as Profile
}

const SobreHome = async () => {

	const profile = await getProfile()

	const src = getUrl(profile?.image)
	return (
		<PageContainer>
			<PageTitle align="start" caps="">{profile?.name!}</PageTitle>
			<div className="grid grid-cols-12 gap-8">
				<div className="relative col-span-12 sm:col-span-4 rounded-3xl  h-[300px] sm:h-5/6">
					<Image priority loader={imageLoader} src={src} alt="Imagem da Estela" fill objectFit="cover" objectPosition="center" className="rounded-3xl mx-2 sm:mx-0" />
				</div>
				<div className="flex flex-col gap-8 col-span-12 sm:col-span-8 mx-2 sm:mx-0">

					<p className="leading-relaxed text-lg">{profile?.description}</p>

					<div className="flex flex-col gap-4">
						<p className="font-bold text-2xl">Curriculum Vitae</p>
						{profile?.curriculum?.map(cv => {
							return (
								<div className="flex flex-col" key={cv.id}>
									<p className="font-bold">{cv.title}</p>
									<p className="leading-relaxed text-lg">{cv.description}</p>
								</div>
							)
						})}
					</div>

					<div className="flex flex-col gap-4">
						<p className="font-bold text-2xl">Na mídia</p>
						{profile?.press?.map(p => {
							return (
								<div className="flex flex-col" key={p.id}>
									<TextLink url={p.link!} text={p.title!}></TextLink>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</PageContainer>
	)
}

export default SobreHome