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

//Modules
import { getDatabaseNames } from './modules/getDatabaseNames';

//Actions
import { setUser, setPhrases } from './redux/reducers/userReducer';
import { setAvilableDatabases } from './redux/reducers/databaseReducer';
import { SideControls } from './components/SideControls';
import { BottomMenu } from './components/BottomMenu';
import { UserSavedPhrases } from './components/UserSavedPhrases';

function App() {

  const dispatch = useDispatch();

 useEffect(() => {
  (async () => {
    const dbNames:any = await getDatabaseNames()
    dispatch(setAvilableDatabases(dbNames));
    })();
  },[]);
 

  useEffect(() => {
    const fetchData = async () => {
      const [userRes, phrasesRes] = await Promise.allSettled([
        axios.get('/api/users/', { withCredentials: true }),
        axios.get('/api/users/phrases', { withCredentials: true }),
      ]);

      if (userRes.status === 'fulfilled') {
        dispatch(setUser(userRes.value.data.user));
      } else {
        console.error(userRes.reason);
        setUser(null);
      }

      if (phrasesRes.status === 'fulfilled') {
        dispatch(setPhrases(phrasesRes.value.data));
      } else {
        console.error(phrasesRes.reason);
      }
    }
    fetchData();

  }, []);

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

        <Route path="/userPhrases" element={
          <div className='secondaryContainer'>
            <SideControls />
            <div className='contentContainer'>
              <BabbleHeader />
              <UserSavedPhrases />
              <BottomMenu />
            </div>
          </div>
        } />

        <Route path="/login" element={
          <div className='loginContainer'>
            <BabbleHeader />
            <LoginScreen />
          </div>
        }
        />

        <Route path="/admin" element={
          <AdminPanel />
        }
        />
      </Routes>
    </div>
  )
}

export default App
