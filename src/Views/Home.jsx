import React from 'react';

import './Home.css'
import BarText from "../Components/BarText/BarText"


function Home() {
    return (
        <div className='gray_box'>
            <div className='square'>
                {/* <Navbar/> */}
                {/* <Welcome/> */}
                <BarText/>
            </div>
        </div>

    ) 
  }

export default Home;