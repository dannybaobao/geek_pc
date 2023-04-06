// 导入重定向的路由模块
import { Navigate } from "react-router-dom"
import { hasToken} from '../../utils/storage'



function Auth(props){
// 获取本地token

    if(hasToken()){
        return <>{props.children}</> 
    }else{
        return <Navigate to="/Login" replace></Navigate>
    }
}

export {Auth}