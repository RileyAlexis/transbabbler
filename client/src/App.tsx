import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Button } from '@radix-ui/themes';

//Components
import { BaseApp } from "./components/BaseApp";
import { ThemeSelector } from './components/ThemeSelector';

function App() {

  return (
    <div>
      <div>
        <h1>Trans Babbler</h1>
        <Routes>
          <Route path="/" element={<>
            <BaseApp />
          </>
          } />
          <Route path="/themeSelect" element={<>
            <ThemeSelector />
          </>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default App
