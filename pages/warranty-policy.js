import React from "react";
import useMainDomain from '../Components/hooks/useMainDomain";

const WarrantyPolicy = () => {
  const mainDomain = useMainDomain();
  return (
    <div className="mid-container">
      <div className="relative terms-img z-10">
        <h1 className="term-text sm:text-2xl text-xl  sm:w-64 w-[210px]">
          Warranty Policy
        </h1>
      </div>

      <div className="mid-container text-justify">
        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          Home Shop BD - ওয়ারেন্টি নীতিমালা
        </h1>
        <p className=" text-base">
          <span className=" font-bold">Home Shop BD </span> - এ আমরা আমাদের
          গ্রাহকদের সন্তুষ্টি নিশ্চিত করতে বিশ্বস্ত পণ্য সরবরাহ করে থাকি এবং
          প্রতিটি পণ্যের জন্য উপযুক্ত ওয়ারেন্টি প্রদান করি। এই নীতিমালা আমাদের
          ওয়েবসাইটে উপলব্ধ বিভিন্ন পণ্যের ওয়ারেন্টি কভারেজের বিবরণ দেয়।
        </p>

        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          ওয়ারেন্টি কভারেজ
        </h1>
        <p className="text-sm">
          <span className=" font-bold">Home Shop BD </span> -এর বেশিরভাগ পণ্য
          ম্যানুফ্যাকচারিংয়ের ত্রুটি এবং কর্মক্ষমতার সমস্যাগুলোর জন্য
          ওয়ারেন্টির আওতায় আসে। প্রতিটি পণ্যের জন্য ওয়ারেন্টি সময়কাল আলাদা
          এবং পণ্যের বিবরণ পৃষ্ঠায় উল্লেখ করা থাকে।
        </p>

        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          সাধারণ ওয়ারেন্টি শর্তাবলী:
        </h1>
        <ul className="grid gap-2 ml-5">
          <li className=" text-base">
            1. <span className=" font-bold">ওয়ারেন্টির সময়কাল:</span> পণ্যটি
            গ্রহণের দিন থেকে ওয়ারেন্টির সময়কাল শুরু হবে।
          </li>

          <li className=" text-base">
            2. <span className=" font-bold">কভারেজ:</span> ম্যানুফ্যাকচারিং
            ত্রুটি, নিম্নমানের উপকরণ, অথবা ভুলভাবে কার্যকরী অংশের জন্য
            ওয়ারেন্টি প্রযোজ্য।
          </li>
          <li className=" text-base">
            3. <span className=" font-bold">সার্ভিসের ধরন:</span> পণ্যের সমস্যার
            উপর নির্ভর করে আমরা মেরামত, প্রতিস্থাপন বা রিফান্ড প্রদান করি।
          </li>
          <li className=" text-base">
            4. <span className=" font-bold">প্রয়োজনীয় ডকুমেন্টেশন:</span>{" "}
            ওয়ারেন্টি দাবি করার জন্য আপনাকে মূল রসিদ বা ক্রয়ের প্রমাণ,
            ওয়ারেন্টি কার্ড (যদি প্রযোজ্য হয়) এবং প্রোডাক্টের সাথে থাকা সমস্ত
            আনুষাঙ্গিক উপস্থাপন করতে হবে।
          </li>
        </ul>

        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          যেসব ক্ষেত্রে ওয়ারেন্টি প্রযোজ্য নয়:
        </h1>
        <ul className="grid gap-2 ml-5">
          <li className=" text-base">
            1. <span className=" font-bold">ফিজিক্যাল ড্যামেজ:</span> পণ্যটি
            ব্যবহারজনিত দুর্ঘটনা, ভুলভাবে পরিচালনা, পানির কারণে ক্ষতি বা
            ব্যবহারকারীর দ্বারা শারীরিক ক্ষতি।
          </li>

          <li className=" text-base">
            2. <span className=" font-bold">অননুমোদিত মেরামত:</span> এমন কোনো
            পণ্য যেটি অনুমোদিত সার্ভিস প্রোভাইডারের দ্বারা মেরামত করা হয়নি বা
            তাতে কোনো পরিবর্তন করা হয়েছে।
          </li>
          <li className=" text-base">
            3. <span className=" font-bold">পরিধানজনিত ক্ষয়:</span>{" "}
            স্বাভাবিকভাবে ব্যবহারের কারণে সময়ের সাথে সাথে ঘটতে থাকা ক্ষতি, যেমন
            ব্যাটারি, স্ক্র্যাচ বা ফেড হওয়া।
          </li>
          <li className=" text-base">
            4. <span className=" font-bold">এক্সেসরিজ:</span> আলাদা বিক্রিত
            এক্সেসরিজ যেমন চার্জার, অ্যাডাপ্টার বা হেডফোন ওয়ারেন্টির আওতায়
            পড়বে না।
          </li>
          <li className=" text-base">
            5. <span className=" font-bold">সফটওয়্যার ইস্যু:</span>
            সফটওয়্যার, ফার্মওয়্যার, অথবা তৃতীয় পক্ষের হার্ডওয়্যার বা
            অ্যাপ্লিকেশনের সাথে সংযুক্তির কারণে কোনো সমস্যা।
          </li>
          <li className=" text-base">
            6. <span className=" font-bold">ভুল ব্যবহার:</span> পণ্যটি সঠিকভাবে
            ব্যবহৃত না হলে বা এর মূল উদ্দেশ্যের বাইরে ব্যবহার করা হলে।
          </li>
          <li className=" text-base">
            7. <span className=" font-bold">প্রাকৃতিক ক্ষতি:</span> প্রাকৃতিক
            ক্ষতি: উচ্চ তাপমাত্রা, আর্দ্রতা বা রাসায়নিকের কারণে সৃষ্ট ক্ষতি।
          </li>
        </ul>

        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          পণ্যভিত্তিক ওয়ারেন্টি:
        </h1>
        <ul className="grid gap-2 ml-5">
          <li className=" text-base flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
            <div>
              <span className=" font-bold">ইলেকট্রনিক্স এবং গ্যাজেটস:</span>{" "}
              অধিকাংশ ইলেকট্রনিক পণ্য ৬ থেকে ১২ মাসের ওয়ারেন্টি সহ আসে, যা কেবল
              ম্যানুফ্যাকচারিং ত্রুটির ক্ষেত্রে প্রযোজ্য।
            </div>
          </li>
          <li className=" text-base flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
            <div>
              <span className=" font-bold">অ্যাপ্লায়েন্সস:</span> বড়
              অ্যাপ্লায়েন্সগুলোর জন্য সাধারণত ১ থেকে ৫ বছরের
              ম্যানুফ্যাকচারার-প্রদত্ত ওয়ারেন্টি থাকে।
            </div>
          </li>
          <li className=" text-base flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
            <div>
              <span className=" font-bold">ফ্যাশন এবং পোশাক:</span> পোশাক এবং
              জুতার ক্ষেত্রে কোনও ওয়ারেন্টি নেই, তবে ডেলিভারির সময়ে উৎপাদনজনিত
              ত্রুটির ক্ষেত্রে প্রতিস্থাপন প্রযোজ্য হতে পারে।
            </div>
          </li>
          <li className=" text-base flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
            <div>
              <span className=" font-bold">ডিজিটাল পণ্য:</span> সফটওয়্যার বা
              ডিজিটাল পণ্যগুলোর জন্য ওয়ারেন্টি প্রযোজ্য নয়।
            </div>
          </li>
        </ul>

        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          ওয়ারেন্টি দাবি করার প্রক্রিয়া
        </h1>
        <p className=" mb-3">ওয়ারেন্টি দাবি করতে নিচের ধাপগুলো অনুসরণ করুন:</p>
        <ul className="grid gap-2 ml-5">
          <li className=" text-base">
            1. <span className=" font-bold">সমস্যা রিপোর্ট করুন:</span> আমাদের
            গ্রাহক সহায়তা টিমের সাথে info@homeshopbd.com ইমেইলের মাধ্যমে অথবা
            01910903717 নম্বরে ফোন করে সমস্যা সম্পর্কে জানান।
          </li>

          <li className=" text-base">
            2. <span className=" font-bold">ডকুমেন্টেশন সরবরাহ করুন:</span>{" "}
            আপনার ক্রয়ের প্রমাণ, ওয়ারেন্টি কার্ড (যদি প্রযোজ্য হয়) এবং
            সমস্যার বিস্তারিত বর্ণনা ও প্রয়োজন অনুযায়ী ছবি বা ভিডিও প্রেরণ
            করুন।
          </li>
          <li className=" text-base">
            3. <span className=" font-bold">পণ্যটি ফেরত পাঠান:</span> সমস্যা
            সমাধানের জন্য আমাদের কাছে পণ্যটি পাঠাতে হবে। মূল প্যাকেজিং এবং
            আনুষাঙ্গিকগুলির সাথে পণ্যটি ফেরত দিন।
          </li>
          <li className=" text-base">
            4. <span className=" font-bold">পরিদর্শন:</span> আমরা পণ্যটি
            পরিদর্শন করে ওয়ারেন্টি দাবি যাচাই করবো। পরিদর্শনের ভিত্তিতে আমরা
            মেরামত, প্রতিস্থাপন বা রিফান্ড করবো।
          </li>
          <li className=" text-base">
            5. <span className=" font-bold">শিপিং খরচ:</span>
            শিপিং খরচ: ওয়ারেন্টি অনুযায়ী বৈধ ত্রুটি থাকলে আমরা শিপিং খরচ বহন
            করবো। তবে ওয়ারেন্টির আওতায় না থাকলে শিপিং খরচ ক্রেতাকে বহন করতে
            হবে।
          </li>
        </ul>

        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          ব্যতিক্রম এবং সীমাবদ্ধতা
        </h1>
        <ul className="grid gap-2 ml-5">
          <li className=" text-base flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
            <div>
              ক্লিয়ারেন্স বা বিশেষ ছাড়ে বিক্রিত পণ্যগুলো সাধারণত ওয়ারেন্টির
              আওতায় পড়ে না, যদি না আলাদাভাবে উল্লেখ করা হয়।
            </div>
          </li>
          <li className=" text-base flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
            <div>ওয়ারেন্টির মেয়াদ শেষ হলে কোনো দাবি গ্রহণ করা হবে না।</div>
          </li>
        </ul>

        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          যোগাযোগের তথ্য
        </h1>
        <ul className="grid gap-2 ml-5">
          <li className=" text-base flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
            <div>
              <span className=" font-bold">ফোন:</span> 01910903717
            </div>
          </li>
          <li className=" text-base flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-900"></div>
            <div>
              <span className=" font-bold">ইমেইল:</span> info@homeshopbd.com
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WarrantyPolicy;

