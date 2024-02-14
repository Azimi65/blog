import { useSelector } from "react-redux"
import { selectUserById } from "../reducers/userSlice";
const ShowUser = ({userId}) => {
    const userName = useSelector(state=>selectUserById(state,userId));
    
    return(
        <span>نوشته شده توسط {" "}{userName?userName.fullname : "ناشناس"}</span>
    )
}
export default ShowUser;