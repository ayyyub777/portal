import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link to="/" className="link">
          {document.title}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};
export default Footer;
