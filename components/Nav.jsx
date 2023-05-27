"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { useState, useEffect } from "react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const setUpProviders = async () => {
    const response = await getProviders();
    setProviders(response);
  };

  useEffect(() => {
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link
        href="/profile"
        className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Sharedia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Sharedias</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="black_btn">
              Create Post
            </Link>
            <button
              className="outline_btn"
              type="button"
              onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile image"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && (
              <div className="flex flex-col gap-4 mt-3">
                <button
                  type="button"
                  key="Google"
                  onClick={() => {
                    signIn("google");
                  }}
                  className="black_btn mx-2">
                  Continue With Google
                </button>

                <button
                  type="button"
                  key="Github"
                  onClick={() => {
                    signIn("github");
                  }}
                  className="black_btn mx-2">
                  Continue With Github
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile image"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"></button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
