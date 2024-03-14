import React from 'react';
import Navigation from './src/components/Navigation/Navigation';
import { AuthProvider } from './src/components/context/AuthContext';


const App = () =>{
  return (
    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  )
}

export default App 