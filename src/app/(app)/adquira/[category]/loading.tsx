// pages/loading.tsx
import SkeletonCard from '@/components/SkeletonCard';

const LoadingComponent = () => {
	return (

		<div className="min-h-screen w-full border col-span-full">
			<div className="grid grid-cols-12 p-4 gap-4 w-full flex-wrap">
				{Array.from({ length: 4 }).map((_, index) => (
					<SkeletonCard key={index} />
				))}
			</div>
		</div>

	);
};

export default LoadingComponent;
