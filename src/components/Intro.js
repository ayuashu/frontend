import React, { useState, useEffect } from 'react';

const Intro = () => {
  const [object, setObject] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchObject = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setObject(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching object:', error);
    }
  };

  useEffect(() => {
    fetchObject();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section>
        <div className="container">
          <div className="cards">
            {object.tickets && object.tickets.map((ticket) => (
              <div key={ticket.id} className="card">
                <div className="card-content">
                    <p className="id">{ticket.id}</p>
                    <svg className='logoicon'xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 64 64" viewBox="0 0 64 64" id="account"><g transform="translate(278 278)"><path fill="#134563" d="M-246-222.1c-13.2 0-23.9-10.7-23.9-23.9s10.7-23.9 23.9-23.9 23.9 10.7 23.9 23.9-10.7 23.9-23.9 23.9zm0-45.2c-11.7 0-21.3 9.6-21.3 21.3 0 11.7 9.6 21.3 21.3 21.3 11.7 0 21.3-9.6 21.3-21.3 0-11.7-9.6-21.3-21.3-21.3z"></path><path fill="#134563" d="m-260-228.7-2.4-1.1c.7-1.7 2.9-2.6 5.4-3.7 2.4-1.1 5.4-2.4 5.4-4v-2.2c-.9-.7-2.3-2.3-2.5-4.6-.7-.7-1.8-2-1.8-3.6 0-1 .4-1.8.7-2.3-.2-1.1-.6-3.3-.6-5 0-5.5 3.8-9.1 9.8-9.1 1.7 0 3.8.5 4.9 1.7 2.7.5 4.9 3.7 4.9 7.4 0 2.4-.4 4.4-.7 5.3.3.5.6 1.2.6 2 0 1.9-.9 3.1-1.8 3.7-.2 2.3-1.5 3.8-2.3 4.5v2.2c0 1.4 2.5 2.3 4.8 3.2 2.7 1 5.5 2 6.4 4.3l-2.5.9c-.4-1.2-2.8-2-4.8-2.8-3.1-1.1-6.6-2.4-6.6-5.6v-3.6l.6-.4c.1 0 1.8-1.2 1.8-3.5v-.9l.8-.3c.1-.1.9-.5.9-1.7 0-.4-.3-.8-.4-.9l-.5-.6.2-.7s.7-2.2.7-5.2c0-2.5-1.4-4.8-2.9-4.8h-.8l-.4-.7c-.3-.5-1.5-1-3.1-1-4.5 0-7.2 2.4-7.2 6.5 0 1.9.7 5 .7 5l.2.7-.5.5s-.4.5-.4 1c0 .7.9 1.6 1.3 2l.5.4v.7c0 2.2 1.9 3.4 1.9 3.4l.6.4v3.6c0 3.3-3.7 5-7 6.4-1.4.8-3.5 1.8-3.9 2.5"></path></g></svg>
                </div>    
                <h2>{ticket.title}</h2>
                <p>Tag: {ticket.tag[0]}</p>
                <p>Status: {ticket.status}</p>
                <p>Priority: {ticket.priority}</p>
              </div>
            ))}
          </div>
        </div>

        {object.users && object.users.map((user) => (
          <div key={user.id}>
            <h2>User</h2>
            <p>Name: {user.name}</p>
            <p>ID: {user.id}</p>
            <p>Available: {user.available ? 'true' : 'false'}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Intro;
