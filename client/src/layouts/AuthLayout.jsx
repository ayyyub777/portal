import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const defaultTheme = createTheme();

const authLayout = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Outlet />
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default authLayout;
