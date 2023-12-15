import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../../../../src/models/UserModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { movieId } = req.body;
    const userId = req.user._id;

    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Add the movieId to the user's myList
      if (!user.myList.includes(movieId)) {
        user.myList.push(movieId);
        await user.save();
      }

      return res.status(200).json({ message: 'Movie added to My List' });
    } catch (error) {
      console.error('Error adding movie to My List:', error);
      return res.status(500).json({
        error: 'Internal server error',
        message: error.message,
      });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
