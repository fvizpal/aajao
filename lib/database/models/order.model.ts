import { Schema, model, models, Document } from 'mongoose'

export interface IOrder {
  id: string;
  createdAt: Date;
  buyerId: string | null;
  // Add other fields present in the `order` table as needed

  event: {
    id: string; // assuming event has an id field
    title: string; // assuming event has a title field
    // Add other fields present in the `event` table as needed

    organiser: {
      id: string;
      name: string;
    } | null; // organiser can be null if the event has no organiser
  } | null; // event can be null if the order has no associated event
}


// export interface IOrder {
//   createdAt: Date
//   stripeId: string
//   totalAmount: string
//   event: {
//     id: string
//     title: string
//   }
//   buyer: {
//     id: string
//     name: string
//   }
// }

export type IOrderItem = {
  id: string
  totalAmount: string
  createdAt: Date
  eventTitle: string
  eventId: string
  buyer: string
}

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: String,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Order = models.Order || model('Order', OrderSchema)

export default Order
