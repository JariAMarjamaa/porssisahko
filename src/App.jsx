import React from 'react';
import InfoNote   from "./noteHandling/infoNotes.jsx";
import RouteConfigs from "./Router/router.js";

import './App.css';

function App() {
  return (
    <div>
      <InfoNote></InfoNote>
      <RouteConfigs />
    </div>
  );
}

export default App;
