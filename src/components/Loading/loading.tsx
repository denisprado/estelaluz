// pages/loading.tsx
import SkeletonCard from '@/components/SkeletonCard';

const LoadingComponent = () => {
	return (
		<div className="md:max-w-7xl flex flex-col self-center items-start justify-center w-full">
			<div className="flex justify-center  w-full  p-14">
				<p className="text-5xl">Carregando...</p>
			</div>
			<div className="min-h-screen w-full">
				<div className="grid grid-cols-12 p-4 gap-4 w-full flex-wrap">
					{Array.from({ length: 4 }).map((_, index) => (
						<SkeletonCard key={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default LoadingComponent;
