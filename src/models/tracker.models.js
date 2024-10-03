import { Schema, model } from 'mongoose';

const trackerSchema = new Schema(
  {
    userAgent: {
      type: String,
    },
    country: {
      type: String,
      default: 'Unknown'
    },
    city: {
      type: String,
      default: 'Unknown'
    },
    zip: {
      type: String,
      default: 'Unknown'
    },
    isp: {
      type: String,
      default: 'Unknown'
    },
    ip: {
      type: String,
      required: true
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
