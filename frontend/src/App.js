import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './routes/Dashboard';
import WelcomePage from './routes/WelcomePage';
import Chat from './routes/Chat';
import ChatCreationPage from './routes/ChatCreationPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<WelcomePage />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>  
        <Route path='/chat' element={<Chat />}></Route>
        <Route path='/new-chat' element={<ChatCreationPage />}></Route>
        <Route path='*' element={
          <main>
            <h1>Page Not Found!</h1>
            <Link to='/dashboard'>Go back to Dashboard</Link>
          </main>
        }></Route>
      </Routes>

    </>
  );
}

export default App;
