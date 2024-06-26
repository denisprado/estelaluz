const Map = (props: { hasCoordinates: (arg0: any) => any; work: { coordenadas: { longitude: any; latitude: any; }; }; }) => {
	return (
		props.hasCoordinates(props.work?.coordenadas) && <div className="w-full border-2 rounded-lg p-2">
			<iframe src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBFQ2XvHhidZ5rCrKnJ9GZMzldlkTUsRKQ&location=${props.work?.coordenadas?.longitude!},${props.work?.coordenadas?.latitude!}&heading=161&pitch=10&fov=35&`} width="100%" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
		</div>)
};


export default Map