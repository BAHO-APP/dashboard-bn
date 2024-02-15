import { Request, Response } from 'express';
import Traffic from '../database/models/traffic.model';

export const getUserAgentStats = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userAgentStats = await Traffic.aggregate([
      {
        $group: {
          _id: null,
          laptopVisits: {
            $sum: {
              $cond: [
                {
                  $regexMatch: {
                    input: '$userAgent',
                    regex: '.*(Windows|Macintosh).*',
                  },
                },
                '$visitCount',
                0,
              ],
            },
          },
          macVisits: {
            $sum: {
              $cond: [
                {
                  $regexMatch: {
                    input: '$userAgent',
                    regex: '.*(Macintosh).*',
                  },
                },
                '$visitCount',
                0,
              ],
            },
          },
          windowsVisits: {
            $sum: {
              $cond: [
                {
                  $regexMatch: {
                    input: '$userAgent',
                    regex: '.*(Windows).*',
                  },
                },
                '$visitCount',
                0,
              ],
            },
          },
          mobileVisits: {
            $sum: {
              $cond: [
                {
                  $regexMatch: {
                    input: '$userAgent',
                    regex: '.*(iPhone|Android).*',
                  },
                },
                '$visitCount',
                0,
              ],
            },
          },
          iPhoneVisits: {
            $sum: {
              $cond: [
                {
                  $regexMatch: {
                    input: '$userAgent',
                    regex: '.*(iPhone).*',
                  },
                },
                '$visitCount',
                0,
              ],
            },
          },
          androidVisits: {
            $sum: {
              $cond: [
                {
                  $regexMatch: {
                    input: '$userAgent',
                    regex: '.*(Android).*',
                  },
                },
                '$visitCount',
                0,
              ],
            },
          },
          postmanVisits: {
            $sum: {
              $cond: [
                {
                  $regexMatch: {
                    input: '$userAgent',
                    regex: '.*(Postman).*',
                  },
                },
                '$visitCount',
                0,
              ],
            },
          },
        },
      },
    ]);
    const deviceStats = userAgentStats[0];

    const allTimeVisits = await Traffic.aggregate([
      {
        $group: {
          _id: null,
          totalVisits: { $sum: '$visitCount' },
        },
      },
    ]);
    const totalVisits = allTimeVisits[0]?.totalVisits || 0;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const visitsToday = await Traffic.aggregate([
      {
        $match: {
          timestamp: {
            $gte: todayStart,
            $lte: todayEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalVisitsToday: { $sum: '$visitCount' },
        },
      },
    ]);
    const totalVisitsToday = visitsToday[0]?.totalVisitsToday || 0;

    res.status(200).json({
      success: true,
      totalVisits,
      visitsToday: totalVisitsToday,
      deviceStats: !deviceStats ? 'No visits at the moment' : deviceStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
