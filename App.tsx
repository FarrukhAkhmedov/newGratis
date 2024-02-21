import React from 'react';
import Navigation from './src/components/Navigation/Navigation';
import { AuthProvider } from './src/components/context/AuthContext';
import BottomSheet from './src/components/Animated/BottomSheet';


const App = () =>{
  return (
    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  )
}

export default App 