import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogUpdated, selectBlogById, updateApiBlog } from "../reducers/blogSlice";

const EditBlogForm = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  // Use useSelector to get the blogs from the state
  const blog = useSelector(state => selectBlogById(state, blogId)
  );

  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmitForm = () => {
    if (title && content) {
      dispatch(updateApiBlog({
        id: blogId,
        date: blog.date,
        title,
        content,
        user: blog.user,
        reactions:{
          heart:0,
          like:0
        } }));
    navigate(`/blogs/${blogId}`);
  }
};


return (
  <section style={{ marginRight: "25px", marginLeft: "25px" }}>
    <h2>ویرایش پست </h2>
    <form>
      <label htmlFor="blogTitle">عنوان پست:</label>
      <input
        type="text"
        name="blogTitle"
        id="blogTitle"
        value={title}
        onChange={titleChange}
      />
      <label htmlFor="blogContent">محتوای پست:</label>
      <textarea
        name="blogContent"
        id="blogContent"
        cols="30"
        rows="10"
        value={content}
        onChange={contentChange}
      ></textarea>
      <button type="button" onClick={handleSubmitForm}>
        ویرایش پست
      </button>
    </form>
  </section>
);
};

export default EditBlogForm;
