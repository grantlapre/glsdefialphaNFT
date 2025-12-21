import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'; 
import Container from 'react-bootstrap/Container';
import {useWeb3Contract} from 'react-moralis';
import Cards from './components/cards';


function App() {
  const {runContractFunction} = useWeb3Contract();



  return (
    <div className="App">
      <Header />
      
      <Container>
       
          <h1 classname="header">GLSDefi Alpha Project</h1>
          <h3 classname="header">Contract Address:</h3>
          <h6 classname="header">0xA63556e4442cF10EA1d1ABdE363F3FED64d6cff9</h6>
       
          <h4>Current State: Public Sale...</h4>


 
      </Container>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bushido...Integrity...Trust NFT :) 
        </p>       
        <Cards />
        <a
          className="App-link"
          href="https://glsdefi.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GLSDefi Alpha Project Launched 21/12/2025
        </a>
      </header>
      
    </div>
    
  );
}

export default App;
