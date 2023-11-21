import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div style={{padding: "1rem"}}>
      <h1>ChatPal</h1>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
