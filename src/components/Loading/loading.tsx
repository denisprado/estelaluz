// pages/loading.tsx
import SkeletonCard from '@/components/SkeletonCard';
import { PageTitle } from '../PageTitle';

const LoadingComponent = ({ type = 'cardList' }: { type?: 'cardList' | 'page' }) => {
	return (
		<div className="md:max-w-7xl flex flex-col self-center items-start justify-center w-full mt-8 gap-8">
			<PageTitle align='start'>
				<p className='text-gray-300'>Carregando...</p>
			</PageTitle>
			<div className="w-full">
				<div className="grid grid-cols-12 gap-4 w-full flex-wrap">
					{Array.from({ length: type === 'cardList' ? 4 : 1 }).map((_, index) => (
						<SkeletonCard key={index} type={type} />
					))}
				</div>
			</div>
		</div>
	);
};

export default LoadingComponent;
