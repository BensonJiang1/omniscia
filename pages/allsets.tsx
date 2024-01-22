import { NextPageContext} from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import { useState, useEffect, use} from 'react';
import { Card,CardContent,CardTitle } from '@/components/ui/card';
import {useRouter} from 'next/router';
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if(!session){
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  }
}

interface TermSet {
  name : string;
}

const allsets = () => {
    const router = useRouter();

    const [termSets, setTermSets] = useState<TermSet[]>([])

    useEffect(() => {
    const fetchTermSets = async () => {
    const response = await fetch('/api/termsets')
    const termSets = await response.json()
    setTermSets(termSets)
    }

    fetchTermSets()
  }, [])

  return (
    <>
    <Navbar />
    <div className='w-screen h-screen bg-neutral-800 flex flex-col items-center pt-24'>
      <div className='w-3/4 h-screen bg-neutral-900 rounded-md grid grid-cols-4 gap-8 justify-items-center'>
        {termSets.map((termSet, index) => (
          <Card 
          key={index} 
          className='h-64 w-64 flex flex-col justify-center items-center hover:border-2'
          onClick={() => {router.push(`/sets?name=${termSet.name}`)}}
          >
            <CardContent className=''>
            <CardTitle>{termSet.name}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </>
  )
}

export default allsets