import { useSelector } from "react-redux"
const ShowUser = ({userId}) => {
    const userName = useSelector((state)=>state.users.find(user=>user.id===userId));
    return(
        <span>نوشته شده توسط {" "}{userName?userName.fullname : "ناشناس"}</span>
    )
}
export default ShowUser;