import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    try{
        const {setname,term,description} = req.body;

        const existingSet = await prismadb.setData.findFirst({
            where: {
                name: setname
            }
        });

        if(existingSet){
            return res.status(422).json({error: 'Setname already exists'
            });
        }

        const set = await prismadb.setData.create({
            data: {
                name: setname,
                terms: [term],
                definitions: [description],
            }
        });

        return res.status(200).json(set);
    } catch(err){
        console.log(err);
        return res.status(400).end();
    }
}
