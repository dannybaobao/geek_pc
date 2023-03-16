import {
  
   Navigate,
  //  Link, 
   Route,
   Routes 
} from "react-router-dom";


import Layout, { LayoutPanel } from "pages/Layout";
import Login from "pages/Login";






function App() {
  return (
  
   <div className="App" >
     {/* <Link to='/login'>登录</Link>
     <Link to='/home'>首页</Link> */}

     {/* 配置路由的规则 */}
     <Routes >
       <Route path="/"  element={< Navigate to="/home"/>}/>
       <Route path="/home" element={<LayoutPanel />}></Route>
       <Route path="/login" element={<Login />}></Route>
     </Routes>
     
    </div>
 
  
     
  );
}

export default App;
