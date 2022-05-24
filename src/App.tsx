import React, { useState } from 'react';
import './App.css';

const HOST = 'https://support.jennifersoft.com:7979';
const USER_ID = 'iframe';
const USER_PASSWORD = '1234';
const DASHBOARD_LIST = [ '0eae211c-d7b6-4696-8f1e-57c15b42f462', 'ffca2b8b-4b35-4688-8282-c236e0d30b3c' ];

function getDashboardUrl(index: number) {
  const prefix = '/userdefine/dashboard?layout=iframe&key=';
  return `${HOST}/login/sso?id=${USER_ID}&password=${USER_PASSWORD}&redirect=${encodeURIComponent(prefix + DASHBOARD_LIST[index])}`;
}

function App() {
  const defaultUrl = getDashboardUrl(0);
  const [url, setUrl] = useState<string>(defaultUrl);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUrl(e.target.value);
  }

  return (
    <div className="App">
      <div className="toolbar">
        제니퍼5 대시보드 : &nbsp;
        <select onChange={onChangeHandler}>
          <option value={getDashboardUrl(0)}>시스템 관리자</option>
          <option value={getDashboardUrl(1)}>사용자정의 대시보드</option>
          <option value="mixed">대시보드 병합</option>
        </select>
      </div>
      {url === 'mixed' ?
          (
              <div className="iframe-list">
                <iframe className="iframe" src={getDashboardUrl(0)}></iframe>
                <iframe className="iframe" src={getDashboardUrl(1)}></iframe>
              </div>
          ) :
          (
              <div className="iframe-list">
                <iframe className="iframe" src={url}></iframe>
              </div>
          )
      }
    </div>
  );
}

export default App;