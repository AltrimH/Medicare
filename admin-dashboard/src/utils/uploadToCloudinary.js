const uploadToCloudinary = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/altrimcloudenv/image/upload/`
  const uploadData = new FormData();

  uploadData.append("upload_preset", "doctor-booking-system");
  uploadData.append("cloud_name", "altrimcloudenv");
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

export default uploadToCloudinary;