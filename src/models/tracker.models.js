import { Schema, model } from 'mongoose';

const trackerSchema = new Schema(
  {
    userAgent: {
      type: String,
    },
    IP: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    collection: 'trackers',
  }
);

const Tracker = model('Tracker', trackerSchema);

export default Tracker;
