import React from 'react';
import Button from './components/Button/Button';

function App(): JSX.Element {
    const buttonText = `Hello World`;

    return <Button title={buttonText} color="#448000" size={32} />;
}

export default App;
