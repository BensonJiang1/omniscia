import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST'){
    return res.status(405).end();
  }

  try{
    const {setName, selectedTerms} = req.body;

    const existingSet = await prismadb.setData.findFirst({
      where: {
        name: setName
      }
    });

    if(!existingSet){
      return res.status(422).json({error: 'Set doesnt exists'});
    }

    // Find the indices of the selected terms in the terms array
    // Find the indices of the selected terms in the terms array
    const selectedIndices = existingSet.terms.map((term, index) => selectedTerms.includes(term) ? index : -1).filter(index => index !== -1);

    // Remove the selected terms and their corresponding definitions
    const newTerms = existingSet.terms.filter((_, index) => !selectedIndices.includes(index));
    const newDefinitions = existingSet.definitions.filter((_, index) => !selectedIndices.includes(index));

    // Update the set with the new terms and definitions
    const updatedSet = await prismadb.setData.update({
      where: {
        id: existingSet.id,
      },
      data: {
        terms: newTerms,
        definitions: newDefinitions,
      }
    });

    return res.status(200).json(updatedSet);
  } catch(err){
    console.log(err);
    return res.status(400).end();
  }
}