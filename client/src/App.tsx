import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './App.css';

//Components
import { LoginScreen } from './components/LoginScreen';
import { ThemeSelector } from './components/ThemeSelector';
import { GenerateBase } from './components/GenerateBase';
import { BabbleHeader } from './components/BabbleHeader';
import { AdminPanel } from './components/AdminPanel/AdminPanel';
import { BaseApp } from './components/BaseApp';

//Actions
import { setUser } from './redux/reducers/userReducer';
import { setAvilableDatabases } from './redux/reducers/databaseReducer';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/users/', { withCredentials: true })
      .then((response) => {
        console.log(response.data.user);
        dispatch(setUser(response.data.user));

      }).catch((error) => {
        console.log(error);
        setUser(null);
      })
  }, []);

  useEffect(() => {
    axios.get('/api/data/databaseNames')
      .then((response) => {
        const dbArray = response.data.map((item: { name: string }) => item.name);
        dispatch(setAvilableDatabases(dbArray))
      }).catch((error) => {
        console.error(error);
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

          <Route path="test" element={<>
            <BabbleHeader />
            <BaseApp />
          </>} />

          <Route path="/admin" element={<>
            <AdminPanel />
          </>}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
