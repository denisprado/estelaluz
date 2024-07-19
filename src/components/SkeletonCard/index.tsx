// components/SkeletonCard.tsx
const SkeletonCard = ({ type = "cardList" }: { type?: "page" | "cardList" }) => {
	return (
		type === 'cardList' ? <div role="status" className="animate-pulse w-full col-span-3 flex-col flex gap-8" >
			<div className="animate-pulse ease-in-out  fade-in duration-1000 w-full">
				<div className="bg-gray-300 h-56 w-full mb-4"></div>
				<div className="bg-gray-300 h-6 w-3/4 mb-2"></div>

			</div>
			<div className="animate-pulse ease-in-out  fade-in duration-1000 w-full">
				<div className="bg-gray-300 h-56 w-full mb-4"></div>
				<div className="bg-gray-300 h-6 w-3/4 mb-2"></div>

			</div>
		</div> :
			<div role="status" className="animate-pulse duration-1000 w-full col-span-12 flex-col flex gap-8" >
				<div className="w-full">
					<div className="bg-gray-300 h-[60dvh] w-full mb-4"></div>
					<div className="bg-gray-300 h-6 w-3/4 mb-2"></div>

				</div>

			</div>

	);
};

export default SkeletonCard;
