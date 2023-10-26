import { Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          MERN Authentication
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium
          alias quod veniam nulla ex fugit laboriosam? Rem, nemo vel.
        </Typography>
      </Container>
    </>
  );
};

export default Home;
