import React from 'react';
import './App.css';
import DataLoader from './components/DataLoader/DataLoader'

const App: React.FC = () => {
  return (
    <DataLoader callback={() => null}/>
  );
}

export default App;
