import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createApiUser, deleteApiUser } from "../reducers/userSlice";
import { nanoid } from "@reduxjs/toolkit";
const Authors = () => {
  const authors = useSelector((state) => state.users);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const handleUserChange = (e) => {
    setUser(e.target.value);
  };
  
  const handelUserDelete = (userId) => {
    dispatch(deleteApiUser(userId));
  };
  const handleSubmitForm = (user) => {
    dispatch(createApiUser({ id: nanoid(), fullname: user }));
    setUser("")
  };
  return (
    <>
      <div style={{ marginRight: "20px" }}>
        <form>
          <label htmlFor="user">نام نویسنده</label>
          <input
            type="text"
            id="user"
            value={user}
            name="user"
            onChange={handleUserChange}
          />
          <button onClick={()=>handleSubmitForm(user)} type="button">
            افزودن نویسنده جدید
          </button>
        </form>
      </div>
      <ul>
        {authors.map((author) => (
          <li
            key={author.id}
            style={{
              marginRight: "20px",
              marginTop: "20px",
              backgroundColor: "",
            }}
          >
            <Link to={`${author.id}`}>{author.fullname}</Link>
            &nbsp;
            <Link
              style={{ color: "tomato"}}
              onClick={() => handelUserDelete(author.id)}
            >
              &otimes;
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Authors;
