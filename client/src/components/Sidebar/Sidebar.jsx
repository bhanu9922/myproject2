import React from "react";
import { MdSettings, MdShare, MdViewList } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import { MdMovieCreation } from "react-icons/md";
import {
  IoChatboxEllipsesSharp,
  IoBookmarks,
  IoBriefcase,
} from "react-icons/io5";
import {  MdPerson } from "react-icons/md";
import { FaUserGraduate, FaCalendarDay } from "react-icons/fa";
import testImage from "../../assets/profilepic.jpg";
import { Friends } from "../../data/dummyData";
import FriendsList from "../FriendsList/FriendsList";

const Sidebar = () => {
  return (
    <div
      style={{ flex: 3, height: "calc(100vh - 50px)" }}
      className="custom-scrollbar overflow-y-auto sticky top-[50px]"
    >
      <div className=" p-[20px] ">
        <ul className="sidebarList m-0 p-0">
          <li>
            <MdViewList />
            <span>Posts</span>
          </li>
          <li>
            <BiSolidVideos />
            <span>Videos</span>
          </li>
          <li>
            <MdMovieCreation />
            <span>Reels</span>
          </li>
          <li>
            <IoChatboxEllipsesSharp />
            <span>Chat</span>
          </li>
          <li>
            <IoBookmarks />
            <span>Saved</span>
          </li>
          <li>
            < MdPerson />
            <span>Profile</span>
          </li>
          <li>
            <MdShare />
            <span>ShareProfile</span>
          </li>
          <li>
            <MdSettings/>
            <span>AccountSettings</span>
          </li>
          <li>
            < MdPerson />
            <span>Logout</span>
          </li>
        </ul>
        <div className="button">
          <button className="rounded-md bg-slate-200  w-[150px] p-[10px]">
            {" "}
            See More
          </button>
        </div>
        <hr className="mt-[20px]" />
        <div className="mt-[20px]">
          <ul className="sidebarList">
            {Friends.map((friend) => (
              <FriendsList key={friend.id} friend={friend} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
