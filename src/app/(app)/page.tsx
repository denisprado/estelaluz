
export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex max-w-7xl pt-24">
				<video muted autoPlay loop preload="none" className="rounded-3xl">
					<source src="/video-home.mp4" type="video/mp4" />
					<track kind="metadata" src="/trecho.vtt" default />

					Your browser does not support the video tag.
				</video>
			</div>
		</main>
	);
}
