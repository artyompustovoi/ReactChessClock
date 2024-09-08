import React from 'react';
import './App.css';
import ChessClock from './components/ChessClock';
//import TestComponent from './ReactComponent';

const App: React.FC = () => {
    return (
        <div className="App">
            <ChessClock />
        </div>
    );
};

export default App;
