import React from "react";

const ImageUploadPreview = () => {
  const uploadImage = (e) => {
    const file = e.target.files[0];
    const preview = document.getElementById("preview");
    console.log(file);
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        preview.src = reader.result;
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="ml-[160px]">
      <img
        src="https://via.placeholder.com/250"
        id="preview"
        draggable="false"
        className="cursor-pointer"
        onClick={() => document.getElementById("fileInput").click()}
        width={250}
        height={250}
      />
      <input
        id="fileInput"
        type="file"
        className="opacity-0"
        accept="image/jpg"
        required
        onChange={uploadImage}
      />
    </div>
  );
};

export default ImageUploadPreview;
