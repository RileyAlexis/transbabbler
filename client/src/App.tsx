import { Routes, Route } from 'react-router-dom';

//Components
import { BaseApp } from "./components/BaseApp";
import { LoginScreen } from './components/LoginScreen';
import { ThemeSelector } from './components/ThemeSelector';

function App() {

  return (
    <div>
      <div>
        <h1>Trans Babbler</h1>
        <Routes>
          <Route path="/" element={<>
            <BaseApp />
            <ThemeSelector />

          </>
          } />
          <Route path="/themeSelect" element={<>
            <ThemeSelector />
          </>
          } />

          <Route path="/login" element={<>
            <LoginScreen />
          </>}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
