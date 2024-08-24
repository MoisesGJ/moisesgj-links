import createError from 'http-errors';
import formatDate from '#libs/moment';

function isShortValid(shortUrl) {
  return /^[a-zA-Z0-9]{3,10}$/.test(shortUrl);
}

function validateBody(req, __, next) {
  const { url, shortUrl } = req.body;

  if (!url) {
    next(createError(400, 'Debe proporcionar la url a acortar'));
  }

  if (shortUrl) {
    if (shortUrl.startsWith(process.env.BASE_URL)) {
      req.body.shortUrl = shortUrl.replace(`${process.env.BASE_URL}/`, '');
    } else if (!isShortValid(shortUrl)) {
      next(createError(404, 'El acortamiento no tiene una sintaxis válida'));
    }
  }

  next();
}

function validateShortLink(req, __, next) {
  const { shortLink } = req.params;

  if (!isShortValid(shortLink)) {
    next(createError(404, 'El acortamiento no tiene una sintaxis válida'));
  } else {
    const currentDateTime = new Date();
    const dateISO = currentDateTime.toISOString();

    req.date = formatDate(dateISO);

    next();
  }
}

export default {
  validateBody,
  validateShortLink,
};
