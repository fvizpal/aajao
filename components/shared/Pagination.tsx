'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation"

type Paginationprop = {
  page: number | string,
  totalPages: number,
  urlParamName?: string,
}

const PaginationEl = ({ page, totalPages, urlParamName }: Paginationprop) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString()
    })

    router.push(newUrl, { scroll: false });
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onClick('prev')}
            aria-disabled={Number(page) <= 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => onClick('next')}
            aria-disabled={Number(page) >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationEl