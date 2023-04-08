import React from 'react';
import ReactDOM from 'react-dom/client';


import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';



import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
     <ConfigProvider locale={locale}>
      <App /> 
     </ConfigProvider>
   </BrowserRouter>
)

