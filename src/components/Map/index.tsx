
import { Work } from "@/payload-types";

const Map = ({ work, height = '800' }:
	{
		// hasCoordinates: (arg0: any) => any;
		work: Work;
		height?: string;
	}) => {

	const mapParameters = work.mapUrl ? extractMapParametersFromUrl(work.mapUrl) : null;

	function extractMapParametersFromUrl(url: string) {
		const regex = /@(.*?),(.*?),(?:3[ad],)?(\d+(\.\d+)?)?y,(\d+(\.\d+)?)h,(\d+(\.\d+)?)t/;
		const matches = url.match(regex);
		console.log("matches", matches)
		if (matches) {
			return {
				lat: parseFloat(matches[1]),
				lng: parseFloat(matches[2]),
				pitch: parseFloat(matches[4]) * .1,
				heading: parseFloat(matches[5]),
				tilt: parseFloat(matches[6]),
			};
		} else {
			return null;
		}
	}

	// https://www.google.com/maps/@-22.8217866,-47.0833643,3a,35.9y,148.73h,86.34t/data=!3m7!1e1!3m5!1s1pvjE4PlB62nVT8My29gBg!2e0!6s
	// https://www.google.com/maps/@-34.903847,-56.2043588,3a,90y,35.57h,83.33t/data=!3m6!1e1!3m4!1svFCDXr9trQ11s_uL4bma0Q!2e0!7i13312!8i6656?hl=pt-BR&coh=205409&entry=ttu


	return (
		// <DynamicMap mapUrl={work.mapUrl} />
		work.mapUrl && mapParameters &&
		<div className="w-full">
			<iframe style={{ scrollBehavior: 'smooth' }} src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBKTYFjiaeFIsPiDrTTTUKxYxDI6-h-_S0&location=${mapParameters!.lat},${mapParameters!.lng!}&heading=${mapParameters!.heading}&pitch=${mapParameters!.pitch}&fov=50&`} width="100%" height={height} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
		</div>
	)
};

export default Map


