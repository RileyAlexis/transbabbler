import React, { useEffect, useState } from 'react';

import { Button } from '@radix-ui/themes';

//Components
import { BaseApp } from "./components/BaseApp";
import { ThemeSelector } from './components/ThemeSelector';

function App() {

  return (
    <div>
      <div>
        <h1>Trans Babbler</h1>
        <BaseApp />
        <ThemeSelector />
      </div>
    </div>
  )
}

export default App
