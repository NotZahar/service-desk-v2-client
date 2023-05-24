import { useState, useEffect } from 'react';
 
export default function Profile() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
 
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
 
  return (
    <div>
      <h1>{(data as any).title}</h1>
    </div>
  );
}