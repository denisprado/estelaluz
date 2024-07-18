
import { Work } from "@/payload-types";
import DynamicMap from "./dinamycMap";

const Map = ({ work, height = '800' }:
	{
		// hasCoordinates: (arg0: any) => any;
		work: Work;
		height?: string;
	}) => {


	return (
		work.mapUrl &&
		<DynamicMap mapUrl={work.mapUrl} />

	)
};

// props.hasCoordinates(props.work?.coordenadas) && <div className="w-full">
// 	<iframe src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBFQ2XvHhidZ5rCrKnJ9GZMzldlkTUsRKQ&location=${props.work?.coordenadas?.longitude!},${props.work?.coordenadas?.latitude!}&heading=161&pitch=10&fov=35&`} width="100%" height={height} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
// </div>



export default Map