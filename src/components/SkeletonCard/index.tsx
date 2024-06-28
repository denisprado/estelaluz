// components/SkeletonCard.tsx
const SkeletonCard = () => {
	return (
		<div className="animate-pulse w-full col-span-3 flex-col flex gap-8">
			<div className="animate-pulse w-full">
				<div className="bg-gray-300 h-40 w-full mb-4"></div>
				<div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
				<div className="bg-gray-300 h-6 w-1/2"></div>
			</div>
			<div className="animate-pulse w-full">
				<div className="bg-gray-300 h-40 w-full mb-4"></div>
				<div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
				<div className="bg-gray-300 h-6 w-1/2"></div>
			</div>
		</div>
	);
};

export default SkeletonCard;
