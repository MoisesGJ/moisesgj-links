import createError from 'http-errors';
import formatDate from '#libs/moment';

function isShortValid(shortUrl) {
  return /^[a-zA-Z0-9]{3,10}$/.test(shortUrl);
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
  validateShortLink,
};
