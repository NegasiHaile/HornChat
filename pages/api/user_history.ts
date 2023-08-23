import { NextApiRequest, NextApiResponse } from 'next';

import connectMongoDB from '@/libs/mongodb';
import User from '@/libs/userModel';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      let reqBody = req.body;
      if (typeof req.body !== 'object') {
        reqBody = JSON.parse(req.body);
      }
      const { email, userName, folders, prompts, history } = reqBody;
      await connectMongoDB();
      const newUser = await User.create({
        email,
        userName,
        folders,
        prompts,
        history,
      });
      res.status(200).json(newUser);
    }
    // UPDATE CONVERSATION HISTORYs
    else if (req.method === 'PUT') {
      // Updating coversation detail using field name and UserID
      const { field, userId } = req.query;
      let reqBody = req.body;

      if (typeof req.body !== 'object') {
        reqBody = JSON.parse(req.body);
      }

      if (typeof userId === 'string' && userId.match(/^[0-9a-fA-F]{24}$/)) {
        await connectMongoDB();
        // read current entry in database

        if (field === 'history') {
          // UPDATE conversation History here
          let newUser = await User.findOneAndUpdate(
            { _id: userId },
            {
              history: reqBody.history,
            },
            { new: true },
          );
          return res.status(200).json(newUser);
        } else if (field === 'folders') {
          // UPDATE Folders here
          let newUser = await User.findOneAndUpdate(
            { _id: userId },
            {
              folders: reqBody.folders,
            },
            { new: true },
          );
          return res.status(200).json(newUser);
        } else if (field === 'prompts') {
          // UPDATE Prompts here
          let newUser = await User.findOneAndUpdate(
            { _id: userId },
            {
              prompts: reqBody.prompts,
            },
            { new: true },
          );
          return res.status(200).json(newUser);
        } else {
          // UPDATE userName and Email here
          let newUser = await User.findOneAndUpdate(
            { _id: userId },
            {
              email: reqBody?.email,
              userName: reqBody?.userName,
            },
            { new: true },
          );
          return res.status(200).json(newUser);
        }
      } else {
        res.status(400).json({ message: '❌ Invalid user ID!' });
      }
    } else if (req.method === 'DELETE') {
      const { id } = req.body;
      await connectMongoDB();
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: '✅ User history deleted!' });
    } else if (req.method === 'GET') {
      const { userId } = req.query;

      await connectMongoDB();
      if (typeof userId === 'string' && userId.match(/^[0-9a-fA-F]{24}$/)) {
        const user = await User.findById(userId);
        return res.status(200).json(user);
      } else {
        res.status(400).json({ message: '❌ Invalid user ID!' });
      }
    } else {
      res
        .status(400)
        .json({ message: '❌ Please set a METHOD:POST,PUT,GET or DELETE.' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default handler;
