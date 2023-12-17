const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

// import axios from "react-axios";

const uploadImageToCloudinary = async (file) => {
  // const url = 'https://api.cloudinary.com/v1_1/altrimcloudenv/image/upload'
  const uploadData = new FormData();

  console.log(file);
  uploadData.append("file", file);
  uploadData.append("upload_present", upload_preset);
  uploadData.append("cloud_name", cloud_name);

  const res = await fetch('https://api.cloudinary.com/v1_1/altrimcloudenv/upload',
    {
      method: "POST",
      body: uploadData,
    }
  );

  // const data = await axios
  //   .post(url, uploadData)
  //   .then((result) => console.log(result))
  //   .catch((err) => console.log(err));

  const data = await res.json();

  return data;
};

export default uploadImageToCloudinary;
