import React, { useMemo, useState } from "react";
import uploadImageToCloudinary from "utils/uploadToCloudinary";
import Header from "components/Header";
import countryList from "react-select-country-list";
import {
  Box,
  Stack,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Avatar,
} from "@mui/material";
import { useAddDoctorQuery } from "state/api";

const CreateDoctor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [phoneNumber, setPhoneNumber] = useState("");

  const country = useMemo(() => countryList().getData(), []);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    address: "",
    city: "",
    country: "",
    gender: "",
    photo: selectedFile,
  });

  const handleInputChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleChange = (value) => {
  //   setPhoneNumber(value);
  // };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setFormData({ ...formData, photo: data?.url });
    setSelectedFile(data?.url);
  };
  console.log(formData)

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { data } = useAddDoctorQuery(formData);
    // console.log(data)
  };

  return (
    <Box m="2.5rem">
      <Header title="Create Doctor" />
      <br />
      <Header subtitle={"Basic information"} />
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={2}
          direction="row"
          sx={{ marginTop: 4, marginBottom: 4 }}
        >
          <Avatar
            alt="Doctor Profile Image"
            src={selectedFile}
            sx={{ width: 50, height: 50 }}
          />
          <Button
            variant="outlined"
            color="secondary"
            component="label"
            size="small"
          >
            Upload Image
            <input type="file" onChange={handleFileInputChange} hidden />
          </Button>
        </Stack>

        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            name="name"
            variant="outlined"
            color="secondary"
            label="First Name"
            defaultValue={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            type="text"
            name="surname"
            variant="outlined"
            color="secondary"
            label="Last Name"
            defaultValue={formData.surname}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="email"
            name="email"
            variant="outlined"
            color="secondary"
            label="Email"
            defaultValue={formData.email}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <TextField
            type="password"
            name="password"
            variant="outlined"
            color="secondary"
            label="Password"
            defaultValue={formData.password}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{ mb: 4 }}
          />
        </Stack>
        <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
          <FormControl required fullWidth sx={{ m: 1, mb: 4, minWidth: 120 }}>
            <InputLabel id="selector-country">Country</InputLabel>
            <Select
              labelId="selector-country"
              id="selector-country"
              name="country"
              defaultValue={formData.country}
              onChange={handleInputChange}
              label="Country"
            >
              {country.map((c) => {
                return <MenuItem value={c.label}>{c.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <TextField
            type="text"
            name="city"
            variant="outlined"
            color="secondary"
            label="City"
            defaultValue={formData.city}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{ mb: 4 }}
          />
          <TextField
            type="text"
            name="address"
            variant="outlined"
            color="secondary"
            label="Address"
            defaultValue={formData.address}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{ mb: 4 }}
          />
        </Stack>
        <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
          {/* <MuiTelInput
            name="phoneNumber"
            variant="outlined"
            color="secondary"
            label="Phone Number"
            defaultCountry="XK"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 4 }}
          /> */}
          <FormControl required fullWidth sx={{ m: 1, mb: 4, minWidth: 120 }}>
            <InputLabel id="selector-gender">Gender</InputLabel>
            <Select
              labelId="selector-gender"
              id="selector-gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              label="Gender"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Button variant="outlined" size="large" color="secondary" type="submit">
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateDoctor;
