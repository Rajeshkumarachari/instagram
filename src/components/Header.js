"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import instagramName from "/public/Instagram_name.webp";
import name from "/public/name.jpeg";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLogin } from "react-icons/ai";
import { signIn, useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className=" shadow-sm border-b sticky top-0 bg-white z-30 p-2">
      <div className=" flex justify-between items-center max-w-6xl mx-auto ">
        <Link href="/" className=" hidden lg:inline-flex">
          <Image src={instagramName} width={96} height={96} alt="Name" />
        </Link>
        <Link href="/" className=" lg:hidden ">
          <Image src={name} width={40} height={40} alt="Name" />
        </Link>
        <input
          type="text"
          placeholder="Search"
          className=" bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4  focus:outline-none max-w-[290px]"
        />

        {session ? (
          <div className="flex items-center gap-2">
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width={30}
              height={30}
              className=" rounded-full cursor-pointer"
            />
            <AiOutlineLogin
              onClick={signOut}
              className="h-10 w-10 text-red-800 cursor-pointer hover:bg-red-50 rounded-full p-2"
            />
          </div>
        ) : (
          <button
            onClick={signIn}
            className="flex gap-1 items-center text-sm font-semibold text-[#0095F6] hover:bg-blue-50 px-2 py-1 rounded-md"
          >
            Login <FcGoogle />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
