// pages/loading.tsx
import CardListContainer from '@/components/CardListContainer';
import SkeletonCard from '@/components/SkeletonCard';

const LoadingComponent = () => {
	return (

		<div className="min-h-screen w-full border col-span-full">
			<CardListContainer>
				{Array.from({ length: 4 }).map((_, index) => (
					<SkeletonCard key={index} />
				))}
			</CardListContainer>
		</div>

	);
};

export default LoadingComponent;
