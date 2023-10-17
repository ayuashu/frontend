import React, { useState, useRef, useEffect } from 'react';
import FetchAPI from './FetchAPI';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupingOpen, setIsGroupingOpen] = useState(false);
  const [data, setData] = useState({ tickets: [], users: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [groupedData, setGroupedData] = useState({});
  const [displayType, setDisplayType] = useState('');

  const groupBy = (key) => {
    const result = data.tickets.reduce((acc, ticket) => {
      const keyValue = ticket[key];
      if (!acc[keyValue]) {
        acc[keyValue] = [];
      }
      acc[keyValue].push(ticket);
      return acc;
    }, {});
    setGroupedData(result);
    setDisplayType(key);
  };

  const renderGroupedTickets = () => {
    return Object.keys(groupedData).map((key) => (
      <div key={key}>
        <h3>{key}</h3>
        {groupedData[key].map((ticket) => (
          <div className="card" key={ticket.id}>
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
    ));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleGrouping = () => {
    setIsGroupingOpen(!isGroupingOpen);
  };

  const handleDataFetch = (fetchedData) => {
    setData(fetchedData);
    setIsLoading(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (groupingRef.current && !groupingRef.current.contains(event.target)) {
        setIsGroupingOpen(false);
      }
    }

    if (isGroupingOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isGroupingOpen]);

  const groupingRef = useRef(null);

  return (
    <div className="nav">
      <FetchAPI onDataFetch={handleDataFetch} /> 
      <div className="dropdown-container">
        <button className="dropdown-button" onClick={toggleDropdown}>
        <svg className='btn-logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="equalizer"><path d="M17,8V7a2,2,0,0,0-2-2H9A2,2,0,0,0,7,7V8H3v2H7v1a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V10H45V8ZM9,11V7h6v4ZM41,22a2,2,0,0,0-2-2H33a2,2,0,0,0-2,2v1H3v2H31v1a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V25h4V23H41Zm-8,4V22h6v4ZM17,38a2,2,0,0,0-2-2H9a2,2,0,0,0-2,2v1H3v2H7v1a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V41H45V39H17ZM9,42V38h6v4Z" data-name="15 Controls, Control, Levels, Option"></path></svg>
          Display
          <svg className={`dropdown-icon ${isOpen ? 'open' : ''}`} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"/></svg>
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <div className="dropdown-content-row">
              <div className="column">Grouping</div>
              <div className="column" ref={groupingRef}>
                <button className="dropdown-btn" onClick={toggleGrouping}>
                  Status
                  <svg className={`dropdown-icon ${isOpen ? 'open' : ''}`} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"/></svg>    
                </button>
                {isGroupingOpen && (
                  <div>
                    <button onClick={() => groupBy('priority')} className="dropdown-btn">Priority</button>
                    <button onClick={() => groupBy('userId')} className="dropdown-btn">User</button>
                  </div>
                )}
              </div>
            </div>
            <div className="dropdown-content-row">
              <div className="column">Ordering</div>
              <div className="column" ref={groupingRef}>
                <button className="dropdown-btn" onClick={toggleGrouping}>
                  Priority
                  <svg className={`dropdown-icon ${isOpen ? 'open' : ''}`} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"/></svg>
                        
                </button>
                {isGroupingOpen && (
                  <div>
                    <button className="dropdown-btn">Status</button>
                    <button className="dropdown-btn">User</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;


{/*
import React, { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupingOpen, setIsGroupingOpen] = useState(false);

  const [data, setData] = useState({ tickets: [], users: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [groupedData, setGroupedData] = useState({});
  const [displayType, setDisplayType] = useState(''); 

  const fetchObject = async () => {
      try {
          const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setData(data);
          setIsLoading(false);
      } catch (error) {
          console.error('Error fetching object:', error);
      }
  };

  useEffect(() => {
      fetchObject();
  }, []);

  const groupBy = (key) => {
      const result = data.tickets.reduce((acc, ticket) => {
          const keyValue = ticket[key];
          if (!acc[keyValue]) {
              acc[keyValue] = [];
          }
          acc[keyValue].push(ticket);
          return acc;
      }, {});
      setGroupedData(result);
      setDisplayType(key);
  };

  const renderGroupedTickets = () => {
      return Object.keys(groupedData).map(key => (
          <div key={key}>
              <h3>{key}</h3>
              {groupedData[key].map(ticket => (
                  <div className="card" key={ticket.id}>
                      <p>Ticket Id :- {ticket.id}</p>
                      <p style={{ color: 'greenyellow' }}>{ticket.priority}</p>
                      <p style={{ color: 'red' }}>{ticket.status}</p>
                      <p style={{ color: 'darkblue' }}>{ticket.tag}</p>
                      <p style={{ color: 'tomato' }}>{ticket.title}</p>
                      <p style={{ color: 'teal' }}>{ticket.userId}</p>
                  </div>
              ))}
          </div>
      ));
  };

  if (isLoading) {
      return <div>Loading...</div>;
  }







  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleGrouping = () => {
    setIsGroupingOpen(!isGroupingOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (groupingRef.current && !groupingRef.current.contains(event.target)) {
        setIsGroupingOpen(false);
      }
    }

    if (isGroupingOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isGroupingOpen]);

  const groupingRef = useRef(null);

  return (
    <div className='nav'>
      <div className="dropdown-container">
        <button className="dropdown-button" onClick={toggleDropdown}>
        <svg className='btn-logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="equalizer"><path d="M17,8V7a2,2,0,0,0-2-2H9A2,2,0,0,0,7,7V8H3v2H7v1a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V10H45V8ZM9,11V7h6v4ZM41,22a2,2,0,0,0-2-2H33a2,2,0,0,0-2,2v1H3v2H31v1a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V25h4V23H41Zm-8,4V22h6v4ZM17,38a2,2,0,0,0-2-2H9a2,2,0,0,0-2,2v1H3v2H7v1a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V41H45V39H17ZM9,42V38h6v4Z" data-name="15 Controls, Control, Levels, Option"></path>
            </svg>
            Display
            <svg className={`dropdown-icon ${isOpen ? 'open' : ''}`} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"/></svg>
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <div className='dropdown-content-row'>
                <div className="column">Grouping</div>
                <div className='column' ref={groupingRef}>
                    <button className="dropdown-btn" onClick={toggleGrouping}>Status
                    <svg className={`dropdown-icon ${isOpen ? 'open' : ''}`} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"/></svg>
                    </button>
                    {isGroupingOpen && (
                    <div>
                        <button onClick={() => groupBy('priority')} className='dropdown-btn'>Priority</button>
                        <button onClick={() => groupBy('userId')} className='dropdown-btn'>User</button>
                    </div>
                    )}
                </div>
            </div>
            <div className='dropdown-content-row'>
                <div className="column">Ordering</div>
                    <div className='column' ref={groupingRef}>
                        <button className="dropdown-btn" onClick={toggleGrouping}>Priority
                        <svg className={`dropdown-icon ${isOpen ? 'open' : ''}`} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"/></svg>
                        </button>
                        {isGroupingOpen && (
                        <div>
                            <button className='dropdown-btn'>Status</button>
                            <button className='dropdown-btn'>User</button>
                        </div>
                        )}
                    </div>
                </div>
          </div>
        )}
      </div>
      {displayType && renderGroupedTickets()}
    </div>
  );
};

export default Navbar;

*/}

                
        