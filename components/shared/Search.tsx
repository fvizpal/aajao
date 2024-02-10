'use client'

import { Input } from "@/components/ui/input"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

const Search = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const iterativeSearch = setTimeout(() => {
      let newUrl = '';
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
      }

      router.push(newUrl, { scroll: false });
    }, 300);
    // inside the cleanup function clears the timeout set by setTimeout to prevent any potential memory leaks. 
    //It ensures that if the effect is re-triggered before the delay has elapsed, the previous timeout is cleared, and a new one is set. 
    //This helps in scenarios where the effect is dependent on user interactions or other dynamic changes and needs to be debounced or throttled.
    return () => clearTimeout(iterativeSearch);
  }, [query, searchParams, router])

  return (
    <div>
      <Input
        type="text"
        placeholder={'Search event...'}
        onChange={(e) => setQuery(e.target.value)}
        className="border-0 outline-offset-0 placeholder:text-grey-500 focus:border-0"
      />
    </div>
  )
}

export default Search