import { Request, Response } from 'express';
import Traffic, { ITraffic } from '../database/models/traffic.model';

export const track = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessionID = req.sessionID;
    const userAgent = req.get('user-agent');
    const timestamp = new Date();

    let traffic: ITraffic | null = await Traffic.findOne({ sessionID });

    if (traffic) {
      traffic.visitCount += 1;
      traffic.timestamp = timestamp;
      await traffic.save();
    } else {
      traffic = new Traffic({
        sessionID,
        userAgent,
        timestamp,
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
