'use client'

import { MapComponent } from "./googleMap";
import { MapProvider } from "./mapProvider";



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
			pitch: parseFloat(matches[4]),
			heading: parseFloat(matches[5]),
			tilt: parseFloat(matches[6]),
		};
	} else {
		return null;
	}
}

const DynamicMap = ({ mapUrl }: { mapUrl: string }) => {

	const mapParameters = extractMapParametersFromUrl(mapUrl);

	console.log("mapParameters", mapParameters)

	if (!mapParameters) {
		return <p>Invalid URL</p>;
	}

	return (
		<MapProvider>
			<MapComponent lat={mapParameters.lat} lng={mapParameters.lng} zoom={mapParameters.zoom} tilt={mapParameters.tilt}></MapComponent>
		</MapProvider>
	);
};

export default DynamicMap;
