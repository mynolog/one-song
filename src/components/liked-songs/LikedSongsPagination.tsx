import type { MouseEvent } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface LikedSongsPaginationProps {
  page: number
  totalPages: number
  onPageChange: (targetPage: number) => void
}

export default function LikedSongsPagination({
  page,
  totalPages,
  onPageChange,
}: LikedSongsPaginationProps) {
  const handlePreviousPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onPageChange(Math.max(1, page - 1))
  }

  const handleNextPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onPageChange(Math.min(totalPages, page + 1))
  }

  const handleTargetPage = (targetPage: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onPageChange(targetPage)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePreviousPage}
            className={`${page === 1 && 'text-muted-foreground hover:text-muted-foreground cursor-not-allowed hover:bg-transparent'}`}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((targetPage) => (
          <PaginationItem key={targetPage}>
            <PaginationLink
              href="#"
              isActive={targetPage === page}
              onClick={handleTargetPage(targetPage)}
            >
              {targetPage}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNextPage}
            className={`${page === totalPages && 'text-muted-foreground hover:text-muted-foreground cursor-not-allowed hover:bg-transparent'}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
