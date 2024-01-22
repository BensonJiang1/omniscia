import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    try{
        const { setName, term, description } = req.body;

        const existingSet = await prismadb.setData.findFirst({
            where: {
                name:setName
            }
        });

        if(!existingSet){
            return res.status(422).json({error: 'Set doesnt exists'
            });
        }

        const updateSet = await prismadb.setData.update({
            where: {
                id: existingSet.id,
            },
            data: {
                terms: {push: term},
                definitions: {push: description}
            }
        });

        return res.status(200).json(updateSet);
    } catch(err){
        console.log(err);
        return res.status(400).end();
    }
}