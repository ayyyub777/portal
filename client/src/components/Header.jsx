import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";

const Header = () => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Auth
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            <RouteLink to="signup" className="link">
              Sign Up
            </RouteLink>
          </Button>
          <Button href="#" variant="contained" sx={{ my: 1, mx: 1.5 }}>
            <RouteLink to="signin" className="link">
              Sign In
            </RouteLink>
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
