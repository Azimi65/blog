import { useDispatch } from "react-redux";
import {reactionAdded} from '../reducers/blogSlice'
const ReactionButtons = ({ blog }) => {
 
  const reactionEmoji = {
    heart: "❤",
    like: "🧿",
  };
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const dispatch = useDispatch();
    return (
      <button
        key={name}
        type="button"
        className="muted-button"
        onClick={() => dispatch(reactionAdded({blogId:blog.id,reaction:name}))}
      >
        {emoji} {blog.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
