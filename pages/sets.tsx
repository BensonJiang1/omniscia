
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { AiOutlineClose } from "react-icons/ai";
import AddTerms from '@/components/AddTerms';
import DeleteTerms from '@/components/DeleteTerms';


import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Flashcard from '@/components/Flashcard'

interface TermSet {
  terms: string[];
  definitions: string[];
}

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

export default function Home() {

  const [termSets, setTermSets] = useState<TermSet>({ terms: [], definitions: [] })
  const router = useRouter();
  const setName = router.query.name;
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [addTerm, setAddTerm] = useState(true);

  const handleAddClick = () => {
    setIsOverlayOpen(true);
    setAddTerm(true);
  };
  const handleDeleteClick = () => {
    setIsOverlayOpen(true);
    setAddTerm(false);
  };

  const handleOverlayClick = () => {
    setIsOverlayOpen(false);
  };

  useEffect(() => {

    const fetchTermSets = async () => {
      const response = await fetch(`/api/getset?setName=${setName}`)
      const termSets = await response.json()
      setTermSets(termSets)
    }

    if (setName) {
      fetchTermSets()
    }

    if (isOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    
  }, [setName, isOverlayOpen])

  
  return (
    <>
    {!isOverlayOpen&&<Navbar />}
    <div className='w-screen h-screen bg-neutral-800 flex flex-col items-center pt-24'>
      <div className='w-2/3 flex flex-col justify-center items-center'>
        <p className='text-4xl mb-4'>{setName}</p>
        <Carousel className='w-[50vw]'>
          <CarouselContent >
            {termSets.terms && termSets.terms.map((term, termIndex) => (
              <CarouselItem key={termIndex}>
                <div className='p-1'>
                  <Flashcard term={term} definition={termSets.definitions[termIndex]}/> 
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
    <div className='w-screen h-screen bg-neutral-800'>
        <button className='w-64 h-64' onClick={handleAddClick}>Add</button>
        <button className='w-64 h-64' onClick={handleDeleteClick}>Delete</button>
      </div>






      {isOverlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          
          <div className="bg-white h-4/5 lg:w-3/5 rounded-md w-2/3 " >
            <div 
              className="
                w-10 
                h-10 
                w-full
                flex 
                justify-end
              "
            >
              <AiOutlineClose size={30} onClick={handleOverlayClick} className="text-black cursor-pointer hover:opacity-80 " />
            </div>
            <div>
              {addTerm && <AddTerms setName={setName} />}
              {!addTerm && <DeleteTerms setName={setName}/>}
            </div>
          </div>
        
        </div>
      )}


    
  </>
  )
}
