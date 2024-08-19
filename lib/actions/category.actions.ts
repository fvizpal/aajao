"use server"

import { CreateCategoryParams } from "@/types"
import Category from "../database/models/category.model"
import { db } from "../database";

export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
  try {
    // Create a new category using Prisma
    const newCategory = await db.category.create({
      data: {
        name: categoryName,
      },
    });

    return newCategory;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category');
  }
}

export const getAllCategories = async () => {
  try {
    // Retrieve all categories using Prisma
    const categories = await db.category.findMany();

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}