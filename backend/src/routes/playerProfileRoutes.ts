import { Router, Request, Response, NextFunction } from 'express';
import { PlayerProfile } from '../models/PlayerProfile';

const router = Router();

router.get('/:playerName', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile = await PlayerProfile.findByPk(req.params.playerName);
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).send('Profile not found');
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await PlayerProfile.upsert(req.body);
    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
});


router.post('/addPlayer', async (req: Request, res: Response, next: NextFunction) => {
  const { playerName } = req.body;
  try {
    const existingProfile = await PlayerProfile.findByPk(playerName);
    if (existingProfile) {
      return res.status(409).send({ message: 'Player name already exists' });
    }
    const profile = await PlayerProfile.create({ playerName });
    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
});

router.get('/allPlayers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profiles = await PlayerProfile.findAll({
      attributes: ['playerName']
    });
    const playerNames = profiles.map(profile => profile.playerName);
    res.json(playerNames);
  } catch (error) {
    next(error);
  }
});

router.delete('/:playerName', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await PlayerProfile.destroy({ where: { playerName: req.params.playerName } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;