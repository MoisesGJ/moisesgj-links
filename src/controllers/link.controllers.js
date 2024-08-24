import linkUsecases from '#usecases/link.usecases';

async function createLink(req, res) {
  try {
    const shortLink = await linkUsecases.createLink(req.body);

    res.status(200).json({
      message: '¡Creado satisfactoriamente!',
      data: { shortLink: `${process.env.BASE_URL}/${shortLink}` },
      success: true,
    });
  } catch (error) {
    res.status(error.status || 400).json({
      error: error.message || 'Ocurrió un error',
      success: false,
    });
  }
}

async function getLink(req, res, next) {
  try {
    const link = await linkUsecases.getLink(req.params, req);

    res.redirect(link);
  } catch (error) {
    next(error);
  }
}

export default {
  createLink,
  getLink,
};
