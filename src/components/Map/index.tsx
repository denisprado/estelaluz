
import { Work } from "@/payload-types";

const Map = ({ work, height = '800' }:
	{
		// hasCoordinates: (arg0: any) => any;
		work: Work;
		height?: string;
	}) => {

	const mapParameters = work.mapUrl ? extractMapParametersFromUrl(work.mapUrl) : null;

	function extractMapParametersFromUrl(url: string) {
		const regex = /@(-?\d+\.\d+),(-?\d+\.\d+),(\d+)a,(\d+\.\d+)y,(\d+\.\d+)h,(\d+\.\d+)t/;
		console.log("url", url)

		const matches = url.match(regex);
		console.log("matches", matches)
		if (matches) {
			return {
				lat: parseFloat(matches[1]),
				lng: parseFloat(matches[2]),
				zoom: parseInt(matches[3]),
				pitch: parseFloat(matches[4]) * .1,
				heading: parseFloat(matches[5]),
				tilt: parseFloat(matches[6]),
			};
		} else {
			return null;
		}
	}

	return (
		// <DynamicMap mapUrl={work.mapUrl} />
		work.mapUrl && mapParameters &&
		<div className="w-full">
			<iframe src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBKTYFjiaeFIsPiDrTTTUKxYxDI6-h-_S0&location=${mapParameters!.lat},${mapParameters!.lng!}&heading=${mapParameters!.heading}&pitch=${mapParameters!.pitch}&fov=50&`} width="100%" height={height} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
		</div>
	)
};

export default Map


