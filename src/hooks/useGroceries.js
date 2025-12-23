import { useState, useEffect } from 'react';

const API_URL = '/api/groceries';

export function useGroceries() {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch groceries');
      }
      const data = await response.json();
      setGroceries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addGrocery = async (grocery) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(grocery),
      });

      if (!response.ok) {
        throw new Error('Failed to add grocery');
      }

      const newGrocery = await response.json();
      setGroceries((prev) => [...prev, newGrocery]);
      return newGrocery;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { groceries, loading, error, addGrocery, refresh: fetchGroceries };
}
