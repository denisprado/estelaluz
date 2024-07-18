/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
'use client'

//Map component Component from library
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";


const MapComponent = ({ lat, lng, zoom, tilt }: { lat: number, lng: number, zoom: number, tilt: number }) => {
	//Map's styling
	const defaultMapContainerStyle = {
		width: '100%',
		height: '100vh',
		borderRadius: '32px 0px 0px 32px',
	};

	//K2's coordinates
	const defaultMapCenter = {
		lat: lat,
		lng: lng
	}

	//Default zoom level, can be adjusted
	const defaultMapZoom = zoom

	//Map options
	const defaultMapOptions = {
		zoomControl: false,
		tilt: tilt,
	};



	return (
		<div className="w-full">
			<GoogleMap
				mapContainerStyle={defaultMapContainerStyle}
				center={defaultMapCenter}
				zoom={defaultMapZoom}
				options={defaultMapOptions}

			>
			</GoogleMap>
		</div>

	)
};

export { MapComponent };