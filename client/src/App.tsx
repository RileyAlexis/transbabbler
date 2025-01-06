import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUser } from './main';
import axios from 'axios';
import './App.css';

//Components
import { LoginScreen } from './components/LoginScreen';
import { ThemeSelector } from './components/ThemeSelector';
import { GenerateBase } from './components/GenerateBase';
import { BabbleHeader } from './components/BabbleHeader';

function App() {

  const { user, setUser } = useUser();

  useEffect(() => {
    axios.get('/api/users/profile', { withCredentials: true })
      .then((response) => {
        console.log(response);
        setUser({
          usernanme: response.data.user.username,
          email: '',
          isAuthenticated: true,
          is_admin: response.data.user.is_admin
        });
      }).catch((error) => {
        console.log(error);
        setUser(null);
      })
  }, [])

  return (
    <div className='primaryContainer' >
      <div>
        <Routes>
          <Route path="/" element={
            <div>
              <BabbleHeader />
              <GenerateBase />
            </div>
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
