import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PopUpModalOpen = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  const id = "693e47c05f133d7f48c32bd3";
  const url = `/api/banner/flash/${id}`;

  // 🔹 Fetch data
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          setData(res.data);
        }
      });
  }, [id]);

  // 🔹 Popup logic
  useEffect(() => {
    if (!data) return;

    const checkAndOpen = () => {
      const now = new Date();
      const endTime = new Date(data.end_time);

      const isActive = data.status === "active";
      const notExpired = now < endTime;

      if (isActive && notExpired) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    // ⏳ First time: open after 30 seconds
    const firstTimeout = setTimeout(() => {
      checkAndOpen();

      // 🔁 After that: every 5 minutes
      const interval = setInterval(checkAndOpen, 5 * 60 * 1000);

      // store interval id for cleanup
      window.popupInterval = interval;
    }, 4 * 1000);

    return () => {
      clearTimeout(firstTimeout);
      if (window.popupInterval) {
        clearInterval(window.popupInterval);
      }
    };
  }, [data]);

  if (!open || !data) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-[90%] max-w-md rounded-xl bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ❌ Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-1 text-sm text-white hover:bg-black"
        >
          ✕
        </button>

        {/* 🖼 Image with internal route */}
        <Link href="/popup" onClick={() => setOpen(false)}>
          <Image
            src={data.image.replace("http://", "https://")}
            alt="Popup Banner"
            width={1200}
            height={1200}
            className="w-full cursor-pointer rounded-xl object-cover"
          />
        </Link>
      </div>
    </div>
  );
};

export default PopUpModalOpen;
