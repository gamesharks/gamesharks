
import React from "react";
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import Matchups from '../components/Matchups/index';
// import styled from "styled-components";


// const Wrapper = styled.div`
//   display: flex;

//   justify-content: center;
//   align-items: center;
//   height: 80vh;
// `;

// const CardsWrapper = styled.div`
  
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   grid-gap: 50px;
//   justify-content: space-evenly;
//   margin: 25px;
  
// `;

const MatchUps = () => {
  return (
    <div className="container">
      <h1>Upcoming Fights</h1>
     
      {/* {make component to show upcoming fights} */}
     
      <Matchups />
    
   
      {/* make component for odds */}
    </div>
  );
};

export default MatchUps;
