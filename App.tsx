import React, { Suspense } from 'react';
import Navigation from './src/components/Navigation/Navigation';
import { AuthProvider } from './src/components/context/AuthContext';


const App = () =>{
  return (
    <AuthProvider>
      <Suspense>
        <Navigation/>
      </Suspense>
    </AuthProvider>
  )
}

export default App 