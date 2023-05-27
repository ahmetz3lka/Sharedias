"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };
    if (params?.id) fetchUserPosts();
  }, [params?.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to the ${userName}'s profile. Explore ${userName}'s prompts`}
      data={userPosts}
    />
  );
};

export default UserProfile;
