import React from 'react';

const AuthContext = React.createContext({
   setAdmin: () => {},
   setUser: () => {},
   admin: null,
   usuario: '',

   
});
export default AuthContext;