import { saveAs } from "file-saver";

export function DownloadImage() {
  let qrCode =
    "https://www.shutterstock.com/image-photo/black-white-portrait-young-woman-600w-1895237446.jpg";

  const handleClick = async () => {
    try {
      const response = await fetch(qrCode);
      const blob = await response.blob();
      console.log(blob);
      saveAs(blob, "qr.png");
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  return (
    <div>
      <button onClick={handleClick}>Download</button>
    </div>
  );
}
