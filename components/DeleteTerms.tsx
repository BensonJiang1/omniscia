import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface DeleteTermsProps {
  setName: string | string[] | undefined;
}

const DeleteTerms: React.FC<DeleteTermsProps> = ({ setName }) => {
  const { register, handleSubmit } = useForm();
  const [terms, setTerms] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the terms when the component mounts
    fetch(`/api/getset?setName=${setName}`)
      .then(response => response.json())
      .then(data => setTerms(data.terms));
  }, [setName]); 

  const onSubmit = async (data: any) => {
    const selectedTerms = Object.keys(data).filter(key => data[key]);

    const response = await fetch('/api/deleteterms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ setName, selectedTerms })
    });

    if (!response.ok) {
      return;
    }

    // If successful, refresh the terms
    const updatedTerms = await response.json();
    setTerms(updatedTerms.terms);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-black'>
      {terms.map((term, index) => (
        <div key={index}>
          <input type="checkbox" id={term} {...register(term)} />
          <label htmlFor={term}>{term}</label>
        </div>
      ))}
      <button type="submit">Delete selected terms</button>
    </form>
  );
}

export default DeleteTerms;