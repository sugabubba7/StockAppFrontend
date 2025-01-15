import React from 'react';
import { useParams } from 'react-router-dom';

const CandleDetails = () => {
  const { candleName } = useParams(); 
  
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold">Details for {candleName}</h1>
      <p className="mt-4">Idhar par detail daalenege {candleName} candlestick pattern ka.</p>

    </div>
  );
};

export default CandleDetails;
