import React from 'react';
import './App.css';

export const HOST = 'https://support.jennifersoft.com:7979';
export const USER_ID = 'iframe';
export const USER_PASSWORD = '1234'
export const DASHBOARD_LIST = [ 'ffca2b8b-4b35-4688-8282-c236e0d30b3c' ];

function App() {
  const prefix = '/userdefine/dashboard?layout=iframe&key=';
  const url = `${HOST}/login/sso?id=${USER_ID}&password=${USER_PASSWORD}&redirect=${encodeURIComponent(prefix + DASHBOARD_LIST[0])}`;

  return (
    <div className="App">
      <iframe className="iframe" src={url}></iframe>
    </div>
  );
}

export default App;
