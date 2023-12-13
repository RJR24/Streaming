// controllers/MyListController.ts
import UserModel from '../models/UserModel';
import { Request, Response } from 'express';

const toggleMyList = async (req: Request, res: Response) => {
  try {
    const { userEmail, movieId } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the movie is already in the user's My List
    const movieIndex = user.myList.indexOf(movieId);

    if (movieIndex === -1) {
      // Add the movie to the My List
      user.myList.push(movieId);
    } else {
      // Remove the movie from the My List
      user.myList.splice(movieIndex, 1);
    }

    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error toggling My List:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { toggleMyList };
