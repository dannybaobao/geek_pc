import {
   BrowserRouter,
  //  Link, 
   Route,
   Routes 
} from "react-router-dom";


import Home from "./pages/layout";
import Login from "./pages/login";






function App() {
  return (
  <BrowserRouter>
   <div className="App">
     {/* <Link to='/login'>登录</Link>
     <Link to='/home'>首页</Link> */}

     {/* 配置路由的规则 */}
     <Routes>
       <Route path="/home" element={<Home/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
     </Routes>
     
    </div>
 
  </BrowserRouter>
     
  );
}

export default App;
