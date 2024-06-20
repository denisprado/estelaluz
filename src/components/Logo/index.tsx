import Image from "next/image";

export default function Logo() {
	return (
		// <Image src={'/EstelaLuz.png'} unoptimized={true} alt={"Logo Extela Luz"} width={171} height={22} />
		<div className={"bg-[url('/EstelaLuz.png')] w-[171px] h-[22px] bg-no-repeat"} />
	)
}