import { useState } from 'react';
import * as React from 'react';
import MainPage   from "./MainPage.tsx";
import LogIn      from "./LogIn/index.jsx";

import './App.css';

function App() {
  const [showMainPage, setShowMainPage] = useState(false);

  return (
    <div>

      {showMainPage ?
        <MainPage handleLogOut={() => setShowMainPage(false)}/>
      :
        <LogIn handleUserSelection={setShowMainPage}/>  
      }
    </div>
  );
}

export default App;
