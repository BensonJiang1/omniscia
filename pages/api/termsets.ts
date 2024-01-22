// pages/api/termsets.ts
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
        const users = await prismadb.setData.findMany({
            select: {
                name: true
            }
            });

        
            const names = users.map(user => ({
                name: user.name
            }))
        res.status(200).json(names)
        } catch(err){
            console.log(err);
            return res.status(400).end();
        }
}