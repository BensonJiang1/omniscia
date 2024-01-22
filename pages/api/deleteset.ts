import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'DELETE'){
    return res.status(405).end();
  }

  try{
    const {setNames} = req.body; // Expect an array of set names

    // Map over the setNames array and delete each set
    const deletedSets = await Promise.all(setNames.map(async (setName: string) => {
      const existingSet = await prismadb.setData.findFirst({
        where: {
          name: setName
        }
      });

      if(!existingSet){
        return null;
      }

      // Delete the set
      const deletedSet = await prismadb.setData.delete({
        where: {
          id: existingSet.id,
        },
      });

      return deletedSet;
    }));

    // Filter out null values (sets that didn't exist)
    const successfulDeletions = deletedSets.filter(set => set !== null);

    res.status(200).json(successfulDeletions);
  } catch(err){
    console.log(err);
    res.status(400).end();
  }
}