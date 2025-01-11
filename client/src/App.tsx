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

//Modules
import { getDatabaseNames } from './modules/getDatabaseNames';

//Actions
import { setUser } from './redux/reducers/userReducer';
import { setAvilableDatabases } from './redux/reducers/databaseReducer';
import { SideControls } from './components/SideControls';
import { BottomMenu } from './components/BottomMenu';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/api/users/', { withCredentials: true })
      .then((response) => {
        dispatch(setUser(response.data.user));

      }).catch((error) => {
        console.log(error);
        setUser(null);
      })
  }, []);

  useEffect(() => {
    getDatabaseNames()
      .then((response) => {
        dispatch(setAvilableDatabases(response));
      }).catch((error) => {
        console.error(error);
      })
  }, [])

  return (
    <div className='primaryContainer' >
      <Routes>
        <Route path="/" element={
          <div className='secondaryContainer'>
            <SideControls />
            <div className='contentContainer'>

              <BabbleHeader />
              <GenerateBase />
              <BottomMenu />
            </div>
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

        <Route path="/admin" element={
          <AdminPanel />
        }
        />
      </Routes>
    </div>
  )
}

export default App
