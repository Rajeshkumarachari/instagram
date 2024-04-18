"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import instagramName from "/public/Instagram_name.webp";
import name from "/public/name.jpeg";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLogin } from "react-icons/ai";
import { signIn, useSession, signOut } from "next-auth/react";
import Modal from "react-modal";
import { IoCreateOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { app } from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      //console.log(imageFileUrl);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  async function uploadImageToStorage() {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot?.bytesTransferred / snapshot?.totalBytes) * 100;
        console.log("Upload is" + progress + "% done");
      },
      (error) => {
        console.error(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUploading(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  }
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
            <IoCreateOutline
              onClick={() => setIsOpen(true)}
              className="h-10 w-10 flex items-center justify-center  p-2 text-blue-800 cursor-pointer hover:bg-blue-50 rounded-full transform hover:scale-125 transition duration-300"
            />
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width={30}
              height={30}
              className=" rounded-full cursor-pointer"
            />
            <AiOutlineLogin
              onClick={signOut}
              className="h-10 w-10 text-red-800 cursor-pointer hover:bg-red-50 rounded-full p-2 transform hover:scale-125 transition duration-300"
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
      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-1 rounded-md shadow-md "
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            {selectedFile ? (
              <Image
                onClick={() => setSelectedFile(null)}
                src={imageFileUrl}
                alt="selectedFile"
                className={` max-h-[250px] w-full object-over cursor-pointer ${
                  imageFileUploading ? "animate-pulse" : ""
                } `}
                width={100}
                height={100}
              />
            ) : (
              <CiImageOn
                onClick={() => filePickerRef.current.click()}
                className=" text-5xl text-blue-500 cursor-pointer"
              />
            )}

            <input
              hidden
              ref={filePickerRef}
              type="file"
              accept="image/*"
              onChange={addImageToPost}
            />
          </div>

          <input
            type="text"
            maxLength="50"
            placeholder="Please add your caption..."
            className="m-4 border-none text-center w-full focus:ring-0 outline-none"
          />

          <button
            disabled
            className="bg-green-600 text-white w-full py-1 rounded-md flex items-center justify-center gap-2 hover:brightness-105 disabled:bg-green-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
          >
            <IoMdSend className="h-6 w-6" /> Upload Post
          </button>
          <IoMdClose
            className=" cursor-pointer absolute top-2 right-2 hover:text-red-700 transition duration-300 hover:bg-red-100 rounded-full h-6 w-6 text-red-600"
            onClick={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Header;
