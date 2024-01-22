import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';




interface TermSet {
    name : string;
  }
  

const DeleteSets = () => {
  const { register, handleSubmit } = useForm();

  const [termSets, setTermSets] = useState<TermSet[]>([])

  useEffect(() => {
  const fetchTermSets = async () => {
  const response = await fetch('/api/termsets')
  const termSets = await response.json()
  setTermSets(termSets)
  }

  fetchTermSets()
}, [])

const onSubmit = async (data: any) => {
    const selectedSets = Object.keys(data).filter(setName => data[setName]);
    
  
    const response = await fetch(`/api/deleteset`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ setNames: selectedSets }),
    });

    if (!response.ok) {
      return;
    }

    const updatedSets = termSets.filter(set => !selectedSets.includes(set.name));
    setTermSets(updatedSets);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-black'>
      {termSets.map((termSet, index) => (
        <div key={index}>
          <input type="checkbox" id={termSet.name} {...register(termSet.name)} />
          <label htmlFor={termSet.name}>{termSet.name}</label>
        </div>
      ))}
      <button type="submit">Delete selected terms</button>
    </form>
  );
}

export default DeleteSets;