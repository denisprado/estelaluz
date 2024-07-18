//Since the map will be laoded and displayed on client side
'use client';

// Import necessary modules and functions from external libraries and our own project
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

// Define a list of libraries to load from the Google Maps API
const libraries = ['places', 'drawing', 'geometry'];

// Define a function component called MapProvider that takes a children prop
export function MapProvider({ children }: { children: ReactNode }) {

	// Load the Google Maps JavaScript API asynchronously
	const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
		libraries: libraries as Libraries,
	});

	if (loadError) return <p>Parece que hou um problema para carregar o map :(</p>

	if (!scriptLoaded) return <p>Procurando o local no mapa ...</p>

	// Return the children prop wrapped by this MapProvider component
	return children;
}