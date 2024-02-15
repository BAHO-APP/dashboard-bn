import mongoose, { Document, Number, Schema } from 'mongoose';

export interface ITraffic extends Document {
  timestamp: Date;
  sessionID: string;
  userAgent: string;
  visitCount: number;
}

const trafficSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  sessionID: {
    type: String,
    required: true,
  },
  visitCount: {
    type: Number,
    default: 1,
  },
  userAgent: {
    type: String,
    required: true,
  },
});

const Traffic = mongoose.model<ITraffic>('Traffic', trafficSchema);

export default Traffic;
