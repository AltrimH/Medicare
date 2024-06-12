import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import { useGetDoctorsQuery } from "state/api";

const Doctor = ({ _id, name, surname, email, photo }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSingleDoctor = () => {
    navigate(`/doctors/${_id}`);
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          alt="profile picture"
          src={photo}
          height="40px"
          width="40px"
          borderRadius="50%"
          sx={{ objectFit: "cover" }}
        />
        <Typography variant="h5" component="div">
          {name} {surname}
          <Typography variant="body2">{email}</Typography>
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={handleSingleDoctor}>
          See More
        </Button>
      </CardActions>
    </Card>
  );
};

const Doctors = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetDoctorsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const handleCreateDoctor = () => {
    navigate('/doctors/add-doctor')
  }

  return (
    <Box m="1.5rem 2.5rem">
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header title="DOCTORS" subtitle="See your list of doctors." />
        <Button variant="contained" size="medium" onClick={handleCreateDoctor}>Create Doctor</Button>
      </CardContent>
      {data?.doctors || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data?.doctors.map(({ _id, name, surname, email, photo }) => (
            <Doctor
              key={_id}
              _id={_id}
              name={name}
              surname={surname}
              email={email}
              photo={photo}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Doctors;
