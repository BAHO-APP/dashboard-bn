import { Request, Response } from 'express';
import Traffic from '../database/models/traffic';

export const track = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionID = req.sessionID;
    const userAgent = req.get('user-agent');

    const existingTraffic = await Traffic.findOne({ sessionID });

    if (existingTraffic) {
      existingTraffic.visitCount += 1;
      await existingTraffic.save();
    } else {
      const traffic = new Traffic({
        sessionID,
        userAgent,
      });
      await traffic.save();
    }

    res.status(201).json({
      success: true,
      message: 'Traffic tracked successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
