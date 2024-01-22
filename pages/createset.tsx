import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import Forms from '@/components/Forms';
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';


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

const createset = () => {
  return (
    <>
    <Navbar />
    <div className="w-screen h-screen bg-neutral-800 pt-24 flex justify-center">
      <Card className='w-2/3 shadow-md shadow-slate-100'>
        <Forms setname={true}/>
      </Card>

      
    </div>
    
    </>
  )
}

export default createset