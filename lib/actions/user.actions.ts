// 'use server'

// import { CreateUserParams, UpdateUserParams } from "@/types";
// import User from "../database/models/user.model";
// import Order from '@/lib/database/models/order.model'
// import { connectToDatabase } from "../database";
// import Event from "../database/models/event.model";
// import { revalidatePath } from "next/cache";


// export async function createUser(user: CreateUserParams) {
//   try {
//     await connectToDatabase();

//     const newUser = await User.create(user);

//     return JSON.parse(JSON.stringify(newUser))
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getUserById(userId: string) {
//   try {
//     await connectToDatabase();

//     const user = await User.findById(userId);

//     if (!user) throw new Error("user not found");

//     return JSON.parse(JSON.stringify(user));
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function updateUser(clerkId: string, user: UpdateUserParams) {
//   try {
//     await connectToDatabase();

//     const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true });

//     if (!updatedUser) throw new Error("User update failed");
//     return JSON.parse(JSON.stringify(updatedUser));
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function deleteUser(clerkId: string) {
//   try {
//     await connectToDatabase();

//     const userToDelete = await User.findOne({ clerkId });

//     if (!userToDelete) throw new Error('User not found');

//     // removing connections from other databases
//     await Promise.all([
//       Event.updateMany(
//         { _id: { $in: userToDelete.events } },
//         { $pull: { organiser: userToDelete._id } }
//       ),

//       Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
//     ])

//     const deletedUser = await User.findByIdAndDelete(userToDelete._id)
//     revalidatePath('/')

//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
//   } catch (error) {
//     console.log(error);
//   }
// }
