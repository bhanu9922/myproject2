import React, { useContext, useEffect, useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import userPic from "./assets/user.png";
import likeIcon from "../../assets/like.png";
import heartIcon from "../../assets/heart.png";
import { getUserData, likeAndDislikePost } from "../../utils/api/api";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [currentWorkoutType, setCurrentWorkoutType] = useState({ comment: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes?.includes(currentUser._id));
  }, [currentUser?._id, post.likes]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await getUserData(post.userId);
        setUser(res.data.userInfo);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [post.userId]);

  useEffect(() => {
    fetchWorkoutTypes();
  }, []);

  const fetchWorkoutTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/workout-types");
      setWorkoutTypes(response.data);
    } catch (error) {
      console.error('Error fetching workout types:', error);
    }
  };

  const addWorkoutType = async () => {
    try {
      if (currentWorkoutType.comment.trim() === '') {
        throw new Error('Comment cannot be empty');
      }
      const response = await axios.post('http://localhost:5000/workout-types', currentWorkoutType);
      setWorkoutTypes([...workoutTypes, response.data]);
      setCurrentWorkoutType({ comment: '' });
    } catch (error) {
      console.error('Error adding workout type:', error);
      toast.error(error.message || 'Failed to add workout type');
    }
  };

  const updateWorkoutType = (type) => {
    setCurrentWorkoutType(type);
    setEditing(true);
  };

  const saveWorkoutType = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/workout-types/${currentWorkoutType._id}`, currentWorkoutType);
      const updatedTypes = workoutTypes.map(type =>
        type._id === currentWorkoutType._id ? response.data : type
      );
      setWorkoutTypes(updatedTypes);
      setCurrentWorkoutType({ comment: '' });
      setEditing(false);
    } catch (error) {
      console.error('Error saving workout type:', error);
    }
  };

  const deleteWorkoutType = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/workout-types/${id}`);
      setWorkoutTypes(workoutTypes.filter(type => type._id !== id));
    } catch (error) {
      console.error('Error deleting workout type:', error);
    }
  };

  const handleLike = async () => {
    try {
      await likeAndDislikePost(post._id, currentUser._id);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full rounded-md shadow-lg mt-[30px] mb-[30px] p-[10px]">
      <div className="p-[10px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={user.profilePicture ? user.profilePicture : userPic}
              alt="Profile Picture"
              className="w-[32px] h-[32px] rounded-full object-cover"
            />
            <Link to={`/profile/${user.username}`}>
              <span className="font-bold ml-[10px] mr-[10px]">
                {user.username}
              </span>
            </Link>
            <span className="text-sm">{moment(post.createdAt).fromNow()}</span>
          </div>
          <div>
            <MdOutlineMoreVert className="text-xl cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="mt-[20px] mb-[20px]">
        <span>{post?.desc}</span>
        {post.img && (
          <img
            src={post.img}
            alt="Post Picture"
            className="mt-[20px] w-full object-contain"
            style={{ maxHeight: "500px" }}
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[5px]">
          <img
            src={likeIcon}
            alt="likeIcon"
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={handleLike}
          />
          <img
            src={heartIcon}
            alt="heartIcon"
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={handleLike}
          />
          <span className="text-sm">{like} likes</span>
        </div>
        <div>
          <div className="container mt-5">
            <h1 className="head">Comments</h1>
            <div className="mb-3">
              <input
                type="text"
                className="form-control inpt"
                placeholder="Type"
                value={currentWorkoutType.comment}
                onChange={(e) => setCurrentWorkoutType({ ...currentWorkoutType, comment: e.target.value })}
              />
              {editing ? (
                <button className="btn btn-success mt-2 btnn" onClick={saveWorkoutType}>POST</button>
              ) : (
                <button className="btn btn-primary mt-2 btnnn" onClick={addWorkoutType}>Post comment</button>
              )}
            </div>
            <ul className="list-group">
              {workoutTypes.map(type => (
                <li key={type._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{type.comment}</strong>: {type.comment}
                  </div>
                  <div>
                    <button className="btn btn-warning mr-2" onClick={() => updateWorkoutType(type)}>Edit comment</button>
                    <button className="btn btn-danger" onClick={() => deleteWorkoutType(type._id)}>Delete comment</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
