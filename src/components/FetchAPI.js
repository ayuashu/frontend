import React, { useState, useEffect } from 'react';

const FetchAPI = ({ onDataFetched }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        onDataFetched(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching object:', error);
      }
    };

    fetchData();
  }, [onDataFetched]);

   return null;
};

export default FetchAPI;
