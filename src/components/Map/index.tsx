const Map = (props:
	{
		hasCoordinates: (arg0: any) => any;
		work: {
			coordenadas: {
				longitude: any;
				latitude: any;
			};
		};
		height?: string;
	}) => {
	const height = props.height ?? '450'
	return (
		props.hasCoordinates(props.work?.coordenadas) && <div className="w-full">
			<iframe src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBFQ2XvHhidZ5rCrKnJ9GZMzldlkTUsRKQ&location=${props.work?.coordenadas?.longitude!},${props.work?.coordenadas?.latitude!}&heading=161&pitch=10&fov=35&`} width="100%" height={height} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
		</div>)
};


export default Map