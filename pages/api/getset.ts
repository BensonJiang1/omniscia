import type { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb' // adjust the path as necessary

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method !== 'GET'){
        return res.status(405).end();
    }
    try{
        const { setName } = req.query; // Get the name of the set from the query parameters

        const set = await prismadb.setData.findFirst({
            where: {
                name: {
                    equals: setName?.toString() ?? '' // Use the name of the set in the query, or an empty string if setName is undefined
                }
            },
            select: {
                terms: true,
                definitions: true
            }
        });
        

        if (!set) {
            return res.status(404).json({ message: 'Set not found' });
}

        const names = {
            terms: set.terms || [], // provide an empty array as a fallback
            definitions: set.definitions || [] // provide an empty array as a fallback
        };

        res.status(200).json(names);
    } catch(err){
        console.log(err);
        return res.status(400).end();
    }
}