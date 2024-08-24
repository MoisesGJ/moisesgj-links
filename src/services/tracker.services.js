import Tracker from '#models/tracker.models';

async function createTracker(trackerData) {
  const newTracker = new Tracker(trackerData);
  return await newTracker.save();
}

export default {
  createTracker,
};
