import Link from '#models/link.models';


async function getLinkByShortUrl(shortUrl) {
  return await Link.findOne({ shortUrl: shortUrl });
}

async function updateLink(id, update) {
  return await Link.findByIdAndUpdate(id, update);
}

export default {
  getLinkByShortUrl,
  updateLink,
};
