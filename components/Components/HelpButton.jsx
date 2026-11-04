import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdRemove } from "react-icons/io";

const HelpButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <div className="fixed z-50 right-[20px] bottom-[70px] md:bottom-[40px] flex items-center justify-between">
      {show && (
        <div
          className={`relative bg-white text-center w-[250px] shadow-md border py-2 px-3 transition-all duration-300 transform ${
            show ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <h2 className="text-sm font-medium">
            পিয়াল বলছি আমি কি আপনাকে কোন ভাবে সাহায্য করতে পারি
          </h2>

          <button
            onClick={() => setShow(false)}
            className="absolute top-[-10px] left-[-10px] bg-gray-300 h-[20px] w-[20px] flex items-center justify-center rounded-full hover:bg-red-400 transition-colors duration-200"
          >
            <IoMdRemove />
          </button>
        </div>
      )}

      <a
        href="https://wa.me/+8801910903717"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
      >
        <Image
          src="/assets/pail.jpg"
          width={100}
          height={100}
          alt="user"
          className="w-[60px] h-[60px] border-[4px] shadow-xl border-white rounded-full overflow-hidden object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute right-[12px] top-[2px] w-[9px] h-[9px] bg-green-500 rounded-full"></div>
      </a>
    </div>
  );
};

export default HelpButton;
