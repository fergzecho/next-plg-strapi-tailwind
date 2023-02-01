import React, { createContext, useState, useEffect, FormEventHandler } from 'react';
import OutsetaApiClient from 'outseta-api-client';

interface AuthContextData {
  currentUser: object | null
  isLogin?: boolean
  login?: (user: string | undefined | null, password: string | undefined | null) => void
  logout?: () => void
  getStatus?: () => void
  
}

const AuthContext = createContext<AuthContextData>({
  currentUser: null,
  isLogin: false
});

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<object | null>(null);
  const [isLogin, setIsLogin] = useState(false)

  const client = new OutsetaApiClient({     
    subdomain: process.env.NEXT_PUBLIC_OUTSETA_SUBDOMAIN as string,
  });

   // initialize 
   useEffect(() => {

    
    
    
  }, [isLogin,currentUser]);

  useEffect(() => {

    const token = localStorage.getItem('user');
    
    if (token) {

      try {
       setUser(token as string)
  
      } catch (err) {
        
        console.log(err.message)
        localStorage.removeItem('user');

      }
    }

  },[])


  // login
  const login = async (user:string,password:string) => {

    // send a login request to outseta with both username and password
    const response = await client.user.login(user,password);
    
    // if user got the access token
    if(response.access_token) {
      
      setUser(response.access_token)
      const savedToken = localStorage.setItem('user', response.access_token)
      
    } 

    
  }

  // set the user 
  const setUser = async (accessToken:string) => {

    // request to get the user information
    const client = new OutsetaApiClient({
      subdomain: process.env.NEXT_PUBLIC_OUTSETA_SUBDOMAIN as string,
      accessToken: accessToken
    });

    const response = await client.user.profile.get()

    if(!response) {
      return;
    }

    
    setCurrentUser(response)
    setIsLogin(true)
    
    
  }

  // check if user is logged in
  

    

    // logout the user 
    const logout = () => {
      
      
      const token = localStorage.getItem("user")

      if(token) {
        setCurrentUser(null)
        setIsLogin(false)
      }

    }


  return (
    <AuthContext.Provider value={{currentUser, login, logout, isLogin, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};



export { AuthProvider, AuthContext };