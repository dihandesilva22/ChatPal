import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './routes/Dashboard';
import WelcomePage from './routes/WelcomePage';
import Chat from './routes/Chat';
import ChatCreationPage from './routes/ChatCreationPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='' element={<WelcomePage />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/chat' element={<Chat />}></Route>
          <Route path='/new-chat' element={<ChatCreationPage />}></Route>
          <Route path='*' element={
            <main>
              <h1>Page Not Found!</h1>
              <Link to={<Dashboard />}>Go back to Dashboard</Link>
              </main>
          }></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
