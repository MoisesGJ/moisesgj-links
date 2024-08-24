import mongoose from 'mongoose';

import Link from '#models/link.models';

async function createLink(linkData) {
  const link = new Link(linkData);
  return await link.save();
}

async function getLinkByUrl(url) {
  return await Link.findOne({ url: url });
}

async function getLinkByShortUrl(shortUrl) {
  return await Link.findOne({ shortUrl: shortUrl });
}

async function updateLink(id, update) {
  console.log(id, update);
  return await Link.findByIdAndUpdate(id, update);
}

export default {
  createLink,
  getLinkByUrl,
  getLinkByShortUrl,
  updateLink,
};
