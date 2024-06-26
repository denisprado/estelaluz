import imageLoader from "@/helpers/loader";
import Image from "next/image";

export default function Logo() {
	return (
		<Image loader={imageLoader} src={'EstelaLUZ.png'} alt={"Logo Estela Luz"} width={171} height={22} />

	)
}