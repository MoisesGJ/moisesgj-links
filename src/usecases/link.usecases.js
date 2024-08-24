import createError from 'http-errors';
import crypto from 'node:crypto';
import debugLib from 'debug';

import linkService from '#services/link.services';
import TrackerService from '#services/tracker.services';

const debug = debugLib('moisesgj-links:linksUsecases');

async function createLink(dataLink) {
  const urlExists = await linkService.getLinkByUrl(dataLink.url);

  if (urlExists && dataLink.shortUrl)
    throw createError(
      400,
      'No se puedo asignar el acortamiento a la url, intente hacer la petición sin proporcionar el acortamiento'
    );
  else if (urlExists) return urlExists.shortUrl;

  if (dataLink.shortUrl) {
    const shortUrlReqExists = await linkService.getLinkByShortUrl(
      dataLink.shortUrl
    );
    if (shortUrlReqExists)
      throw createError(400, 'Intente con otro acortamiento');
  } else {
    let shortUrlExists;

    do {
      dataLink.shortUrl = crypto.randomBytes(5).toString('hex').slice(0, 9);

      shortUrlExists = await linkService.getLinkByShortUrl(dataLink.shortUrl);
    } while (shortUrlExists);
  }

  const newLink = await linkService.createLink(dataLink);

  return newLink.shortUrl;
}

async function getLink(dataLinkParam, dataLinkReq) {
  if (!dataLinkParam.shortLink)
    throw createError(400, 'Debe proporcionar el acortamiento');

  const shortUrlReqExists = await linkService.getLinkByShortUrl(
    dataLinkParam.shortLink
  );

  if (!shortUrlReqExists) throw createError(400, 'El acortamiento no existe');

  const clientUserAgent = dataLinkReq.headers['user-agent'];

  const xForwardedFor = dataLinkReq.headers['x-forwarded-for'];
  const clientIp = xForwardedFor ? xForwardedFor.split(',')[0] : dataLinkReq.ip;

  const clientDate = dataLinkReq.date;

  const clientPetition = {
    userAgent: clientUserAgent,
    IP: clientIp,
    date: clientDate,
  };

  const newTracker = await TrackerService.createTracker(clientPetition);

  const createTracker = await linkService.updateLink(shortUrlReqExists._id, {
    $push: { trackers: newTracker._id },
  });

  debug(createTracker);

  return shortUrlReqExists.url;
}

export default {
  createLink,
  getLink,
};
