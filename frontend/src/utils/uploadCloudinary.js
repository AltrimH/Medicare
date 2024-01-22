const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const uploadImageToCloudinary = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`
  const uploadData = new FormData();

  console.log(cloud_name)
  console.log(file);
  
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);
  uploadData.append("file", file);

  const res = await fetch(url,
    {
      method: "POST",
      body: uploadData,
    }
  );

  const data = await res.json();

  return data;
};

export default uploadImageToCloudinary;
