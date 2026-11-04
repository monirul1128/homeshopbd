import axios from "axios";
import { toast } from "react-toastify";

const imgUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;

export const singleImageUploader = (
  event,
  setImageUrl,
  setImageUploadErrorMessage = () => {}
) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);

      canvas.toBlob(
        (blob) => {
          const formdata = new FormData();
          const fileType = file.type;
          const isWebP = fileType === "image/webp";

          if (!isWebP) {
            formdata.append("image", blob, "image.webp");
          } else {
            formdata.append("image", blob, "image." + fileType.split("/")[1]);
          }

          fetch(imgUrl, {
            method: "POST",
            body: formdata,
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.data?.url) {
                setImageUrl(result.data?.url);
                return setImageUploadErrorMessage(null);
              }

              setImageUploadErrorMessage(
                "Image Upload failed, please check your internet connection"
              );
            })
            .catch((error) => console.error("Error:", error));
        },
        file.type,
        0.8
      );
    };
  };
};

export const handleMultiImageUpload = (
  event,
  imageUrl,
  setImageUrl,
  setImageUploadErrorMessage = () => {}
) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);

      canvas.toBlob(
        (blob) => {
          const formdata = new FormData();
          formdata.append("image", blob, "image.webp");

          fetch(imgUrl, {
            method: "POST",
            body: formdata,
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.data?.url) {
                let newImageUrls = [...imageUrl];
                newImageUrls.push(result.data?.url);
                setImageUrl(newImageUrls);
                return setImageUploadErrorMessage(null);
              }

              setImageUploadErrorMessage(
                "Image Upload failed, please check your internet connectoin"
              );
            })
            .catch((error) => console.error("Error:", error));
        },
        "image/webp",
        0.8
      );
    };
  };
};

export const uploadImage = async (file, setImageUrl, setLoading = () => {}) => {
  const MAX_SIZE_MB = 1.5;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  const storeId = "homeshopbd";

  if (!file || !storeId) {
    console.warn("File or Store ID is missing.");
    return;
  }

  if (file.size > MAX_SIZE_BYTES) {
    toast.error(
      `ছবির সাইজ ${MAX_SIZE_MB}MB এর বেশি হওয়ায় আপলোড করা যাচ্ছে না।`,
      {
        position: "top-center",
      }
    );
    return;
  }

  setLoading(true);

  const formData = new FormData();
  formData.append("folder_id", storeId);
  formData.append("file", file);
  formData.append("key", "supersecretkey123");

  try {
    const { data } = await axios.post(
      "https://img.garagepotti.xyz/api/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (data?.url) {
      setImageUrl(data.url);
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("📷 Image Upload Error:", error);
    toast.error("ছবি আপলোডে সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
      position: "top-center",
    });
  } finally {
    setLoading(false);
  }
};

export const uploadImageTwo = (file, setImageUrl, setLoading) => {};

export const uploadImage2 = (file, setImageUrl, setLoading) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }
    setLoading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64EncodedImage = reader.result;
        const res = await fetch(
          "https://server-homeshopbd-2-kohl.vercel.app/api/v1/upload",
          {
            method: "POST",
            body: JSON.stringify({ data: base64EncodedImage }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          throw new Error(`Failed to upload image: ${res.statusText}`);
        }

        const data = await res.json();
        setImageUrl((pre) => [...pre, data.url]);
        resolve(data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
        reject(error);
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = () => {
      console.error("Error reading file");
      setLoading(false);
      reject(new Error("Error reading file"));
    };
    reader.readAsDataURL(file);
  });
};

export const uploadImage25 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64EncodedImage = reader.result;
        const res = await fetch(
          "https://server-homeshopbd-2-kohl.vercel.app/api/v1/upload",
          {
            method: "POST",
            body: JSON.stringify({ data: base64EncodedImage }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to upload image: ${res.statusText}`);
        }

        const data = await res.json();
        resolve(data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
        reject(error);
      }
    };
    reader.onerror = () => {
      console.error("Error reading file");
      reject(new Error("Error reading file"));
    };
    reader.readAsDataURL(file);
  });
};

export const uploadImage2533 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64EncodedImage = reader.result;
        const res = await fetch(
          "https://server-homeshopbd-2-copy.vercel.app/api/v1/upload",
          {
            method: "POST",
            body: JSON.stringify({ data: base64EncodedImage }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to upload image: ${res.statusText}`);
        }

        const data = await res.json();
        resolve(data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
        reject(error);
      }
    };
    reader.onerror = () => {
      console.error("Error reading file");
      reject(new Error("Error reading file"));
    };
    reader.readAsDataURL(file);
  });
};

// export const uploadMultipleFiles = async (
//   files,
//   setImageUrl,
//   setImageLoading
// ) => {
//   try {
//     setImageLoading(true);
//     const uploadPromises = files.map((file) => uploadImage25(file));
//     const results = await Promise.all(uploadPromises);

//     console.log(results);

//     if (results) {
//       setImageLoading(false);
//       setImageUrl((pre) => [...pre, ...results]);
//     }

//     return results;
//   } catch (error) {
//     console.error("Error uploading files:", error);
//     setImageLoading(false);
//     throw error;
//   }
// };

export const uploadMultipleFiles2 = async (
  files,
  setImageUrl,
  setImageLoading
) => {
  console.log("uploadMultipleFiles2 called with files:", files);
};

export const uploadMultipleFiles = async (
  files,
  setImageUrl,
  setImageLoading
) => {
  setImageLoading(true);
  const storeId = "homeshopbd";
  const uploadedUrls = [];
  const maxSize = 1.5 * 1024 * 1024; // 1.5MB in bytes

  for (const file of files) {
    // Skip files larger than 1.5MB
    if (file.size > maxSize) {
      toast.error(`"${file.name}" ছবির সাইজ ১.৫ এমবির বেশি হওয়ায় আপলোড হয়নি।`, {
        position: "top-center",
      });
      continue;
    }

    const formData = new FormData();
    formData.append("folder_id", storeId);
    formData.append("file", file);
    formData.append("key", "supersecretkey123");

    try {
      const response = await axios.post(
        "https://img.garagepotti.xyz/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      uploadedUrls.push(response.data.url);
    } catch (error) {
      console.error("Error uploading one image:", error);
      toast.error(`"${file.name}" আপলোডে সমস্যা হয়েছে।`, {
        position: "top-center",
      });
    }
  }

  setImageUrl((prev) => [...prev, ...uploadedUrls]);
  setImageLoading(false);
};
