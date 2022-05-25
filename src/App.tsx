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
  const [url, setUrl] = useState<string>("mixed");

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUrl(e.target.value);
  }

  const onOpenJennifer5 = () => {
    window.open(`${HOST}/login/sso?id=${USER_ID}&password=${USER_PASSWORD}`);
  }

  const onOpenXViewPopup = () => {
    window.open(
        `${HOST}/login/sso?id=${USER_ID}&password=${USER_PASSWORD}&redirect=%2Fpopup%2FxviewAnalysis%3FdomainId%3D3000%26transactionId%3D-1523200512219595557%26searchTime%3D1653453568146`,
        'xviewPopup',
        'width=1280,height=768'
    );
  }

  return (
    <div className="App">
      <div className="toolbar">
        <strong>대시보드 종류</strong>
        <select onChange={onChangeHandler}>
          <option value={getDashboardUrl(0)}>시스템 관리자</option>
          <option value={getDashboardUrl(1)}>사용자정의 대시보드</option>
          <option value="mixed" selected>Iframe 병합</option>
        </select>
        <button onClick={onOpenJennifer5}>제니퍼5 열기</button>
        <button onClick={onOpenXViewPopup}>XView 팝업 열기</button>
      </div>
      {url === 'mixed' ?
          (
              <div className="iframe-list">
                <iframe className="iframe" src={getDashboardUrl(1)}></iframe>
                <iframe className="iframe" src={getDashboardUrl(0)}></iframe>
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
