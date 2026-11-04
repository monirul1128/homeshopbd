import { Icon } from "@iconify/react";
import React from "react";

class ImageDownloader extends React.Component {
  downloadImage = () => {
    const { imageUrl, fileName } = this.props;
    const serverUrl = `https://server-homeshopbd-2-kohl.vercel.app/api/v1/upload/download?url=${encodeURIComponent(
      imageUrl
    )}&fileName=${encodeURIComponent(fileName)}`;

    // Open the server URL to download
    const link = document.createElement("a");
    link.href = serverUrl;
    link.click();
  };

  render() {
    return (
      <>
        <button
          onClick={this.downloadImage}
          className=" bg-primary mb-4 hover:bg-primary/80 flex items-center justify-center duration-300 w-[208px] h-[38px] rounded-[4px] text-[14px] font-medium text-white"
        >
          <Icon icon="lucide:arrow-down-to-line" className=" text-[25px]" />
          Download Product Image
        </button>
      </>
    );
  }
}

export default ImageDownloader;
