'use client'
import {
	Pagination as PaginationComponent,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/utilities/cn'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Pagination: React.FC<{
	className?: string
	page: number
	category: string
	totalPages: number
}> = (props) => {
	const router = useRouter()
	const { className, page, totalPages, category } = props
	const hasNextPage = page < totalPages
	const hasPrevPage = page > 1

	const hasExtraPrevPages = page - 1 > 1
	const hasExtraNextPages = page + 1 < totalPages


	return (
		<div className={cn('my-12', className)}>
			<PaginationComponent>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							disabled={!hasPrevPage}
							onClick={() => {
								router.push(`/obras/${category}/page/${page - 1}`)
							}}
						/>
					</PaginationItem>

					{/* {hasExtraPrevPages && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)} */}

					{hasPrevPage && (
						<PaginationItem>
							<PaginationLink
								onClick={() => {
									router.push(`/obras/${category}/page/${page - 1}`)
								}}
							>
								{page - 1}
							</PaginationLink>
						</PaginationItem>
					)}

					<PaginationItem>
						<PaginationLink
							isActive
							onClick={() => {
								router.push(`/obras/${category}/page/${page}`)
							}}
						>
							{page}
						</PaginationLink>
					</PaginationItem>

					{hasNextPage && (
						<PaginationItem>
							<PaginationLink
								onClick={() => {
									router.push(`/obras/${category}/page/${page + 1}`)
								}}
							>
								{page + 1}
							</PaginationLink>
						</PaginationItem>
					)}

					{/* {hasExtraNextPages && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)} */}

					<PaginationItem>
						<PaginationNext
							disabled={!hasNextPage}
							onClick={() => {
								router.push(`/obras/${category}/page/${page + 1}`)
							}}
						/>
					</PaginationItem>
				</PaginationContent>
			</PaginationComponent>
		</div>
	)
}
