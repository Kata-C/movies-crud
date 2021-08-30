import './App.css';
import React,{useState} from 'react';
import AuthContext from './auth.context';
import Layout from './views/Layout';

function App() {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState('');
  return (
    <div className="App">
       <AuthContext.Provider  value={{ admin: admin, usuario: user, setAdmin: setAdmin, setUser: setUser}}>  
          <Layout />
        </AuthContext.Provider>
    </div>
  );
}

export default App;
