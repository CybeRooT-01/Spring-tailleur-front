const UploadImage = ({ image, setImage, reference }) => {
  const uploadImage = (e) => {
    const file = e.target.files[0];
    const preview = document.getElementById("preview");
    console.log(file);

    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        preview.src = reader.result;
        setImage(reader.result);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-1/2 text-right ">
      <div className="ml-[160px]">
        <img
          src={image ? image : "https://via.placeholder.com/250"}
          id="preview"
          draggable="false"
          className="cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
          width={250}
          height={250}
          alt="preview"
          value={image}
          onChange={(e) => setImage(e.target.value)}
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
      <div className="relative mb-7">
        <input
          placeholder="reference"
          type="text"
          id="disabled-input-2"
          aria-label="disabled input 2"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[420px] p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={reference}
          disabled
        />
        <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
          reference
        </label>
      </div>
    </div>
  );
};

export default UploadImage;
