import React, { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
    <>
        <div>
        <button onClick={() => setIsOpen(!isOpen)}>Display</button>
        {isOpen && (
            <div>
            <p>Option A</p>
            <p>Option B</p>
            <p>Option C</p>
            </div>
        )}
        </div>
    </>
  )
}

export default Navbar

