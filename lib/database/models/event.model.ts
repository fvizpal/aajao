import { Document, Schema, model, models } from "mongoose";

export interface IEvent {
  id: string;
  title: string;
  description?: string | null;
  location?: string | null;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  fees: string | null;
  isFree: boolean;
  url?: string | null;
  category: { id: string; name: string | null } | null;
  organiser: { id: string; name: string | null } | null;
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  fees: { type: String },
  isFree: { type: Boolean, default: true },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  organiser: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Event = models.Event || model('Event', EventSchema);

export default Event;