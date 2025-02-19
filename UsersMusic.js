const { prisma, express } = require('./common');
const router = express.Router();
module.exports = router;

//--------------------users---------------------//

router.get('/users', async (req, res) => {
  try {
    const response = await prisma.user.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.user.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        playlists: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: 'No user found!' });
  }
});

//------------------playlist-------------------//

router.get('/playlists', async (req, res) => {
  try {
    const response = await prisma.playlist.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: 'No playlist found!' });
  }
});

router.get('/playlists/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.playlist.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        tracks: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: 'No playlist found!' });
  }
});

router.post('/playlists', async (req, res) => {
  const { name, description, ownerId, tracksId } = req.body;
  try {
    const response = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerId,
        tracks: {
          connect: tracksId.map((id) => ({ id })),
        },
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).send({ error: 'Oops...' });
  }
});

//---------------------tracks--------------------//

router.get('/tracks', async (req, res) => {
  try {
    const response = await prisma.track.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/tracks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.track.findFirstOrThrow({
      where: {
        id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send({ error: 'No Track Was Located' });
  }
});