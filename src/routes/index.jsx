import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layouts/MainLayout.jsx';
import App from '../App.jsx'
import SingleBlogPage from "../components/SingleBlogPage.jsx";
import CreateBlogForm from "../components/CreateBlogForm.jsx";
import EditBlogForm from "../components/EditBlogForm.jsx";
import Authors from '../components/Authors.jsx';
import UserBlogs from "../components/UserBlogs.jsx";
export const router=createBrowserRouter([
    {
      path:"/",
      element:<MainLayout/>,
      errorElement:(<h3 className='text-center'>چنین مسیری یافت نشد</h3>),
      children:([
        {
          path:"/",
          element:<App/>
        },
        {
          path:"/blogs/:blogId",
          element:<SingleBlogPage/>,
          
        },
        {
          path:"/blogs/create-blog",
          element:<CreateBlogForm/>
        },
        {
          path:"/editblogs/:blogId",
          element:<EditBlogForm/>
        },
        {
          path:"/authors",
          element:<Authors/>
        },
        {
          path:"/authors/:userId",
          element:<UserBlogs/>
        }
      ])
    }
  ]);