import {
  
   Navigate,
  //  Link, 
   Route,
   Routes 
} from "react-router-dom";


import {LayoutPanel} from "pages/Layout";
import Login from "pages/Login";








function App() {
  return (
  
   <div className="App" >
     {/* <Link to='/login'>登录</Link>
     <Link to='/home'>首页</Link> */}

     {/* 配置app整体页面路由的规则 */}
     <Routes >
       <Route path="/"  element={< Navigate to="/home"/>}>
          
       </Route>
       {/* 二级路由依赖/home，模糊匹配 */}
       <Route path="/home/*" element={<LayoutPanel />}>
       </Route>
       <Route path="/login" element={<Login />}></Route>
      
     </Routes>
     
    </div>
 
  
     
  );
}

export default App;
