import linkUsecases from '#usecases/link.usecases';

async function getLink(req, res, next) {
  try {
    const link = await linkUsecases.getLink(req.params, req);

    res.redirect(link);
  } catch (error) {
    next(error);
  }
}

export default {
  getLink,
};
