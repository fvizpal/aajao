'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Category } from "@prisma/client"

const CategoryFilter = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories()

      categoryList && setCategories(categoryList as Category[]);
    }

    getCategories();
  }, [])

  const onSelectCategory = (category: string) => {
    let newUrl = '';

    if (category && category !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: category,
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category']
      })
    }

    router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>

        {categories.map((category) => (
          <SelectItem value={category.name} key={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

  )
}

export default CategoryFilter