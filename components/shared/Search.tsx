'use client'

import { Input } from "@/components/ui/input"
import { useState } from "react"

const Search = () => {
  const [query, setQuery] = useState('');



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