import createError from 'http-errors';

import linkService from '#services/link.services';
import TrackerService from '#services/tracker.services';

import getIpInfo from '#libs/ip';

async function getLink(dataLinkParam, dataLinkReq) {
  if (!dataLinkParam.shortLink)
    throw createError(400, 'Debe proporcionar el acortamiento');

  const shortUrlReqExists = await linkService.getLinkByShortUrl(
    dataLinkParam.shortLink
  );

  if (!shortUrlReqExists) throw createError(400, 'El acortamiento no existe');

  const clientUserAgent = dataLinkReq.headers['user-agent'];

  const clientIp = (
    dataLinkReq.headers['cf-connecting-ip'] ||
    dataLinkReq.headers['x-real-ip'] ||
    dataLinkReq.headers['x-forwarded-for'] ||
    dataLinkReq.connection.remoteAddress || ''
  ).split(',');


  const infoIp = await getIpInfo(clientIp[0].trim());

  const clientDate = dataLinkReq.date;

  const clientPetition = {
    ...infoIp,
    userAgent: clientUserAgent,
    date: clientDate,
  };


  const newTracker = await TrackerService.createTracker(clientPetition);

  await linkService.updateLink(shortUrlReqExists._id, {
    $push: { trackers: newTracker._id },
  });


  return shortUrlReqExists.url;
}

export default {
  getLink,
};
