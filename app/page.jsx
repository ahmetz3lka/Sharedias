import React from "react";
import Feed from "@components/Feed";

const Home = () => {
  return (
    <div className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI powered prompts</span>
      </h1>
      <p className="desc text-center">
        Sharedia is a tool that you can share the useful AI tools ( ChatGPT,
        Bard... ) propmts that's gonna be more effective in output
      </p>
      <Feed />
    </div>
  );
};

export default Home;
