import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  IconButton,
  Avatar,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Bell, LogOut, SearchIcon } from "lucide-react";
import logo from "../../../assets/logo.png";
import useAuth from "../../../store/use-auth";
import { useState } from "react";
import { toast } from "sonner";
import axiosIntense from "../../../http/axios-instence";

type NavbarType = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const Navbar = ({ searchQuery, setSearchQuery }: NavbarType) => {
  const { userInfo } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axiosIntense.post("/auth/logout");
      window.location.pathname = "/auth/sign-in";
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again";
      toast.error(errorMessage);
    }
  };
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <img src={logo} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: "flex" }}
          >
            <Box component="span" sx={{ color: "#9333ea", fontWeight: "bold" }}>
              Books
            </Box>
            <Box component="span" sx={{ ml: 0.5 }}>
              List
            </Box>
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: isMobile ? "flex-start" : "start",
            ml: isMobile ? 2 : 0,
          }}
        >
          <Search sx={{ maxWidth: isMobile ? "100%" : "500px", width: "100%" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any training you want"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton size="large">
            <Bell />
          </IconButton>
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={handleClick}
          >
            <Avatar
              id="basic-button"
              sx={{ ml: 2, width: 36, height: 36 }}
              alt="User Profile"
              src={`https://avatar.iran.liara.run/public/${userInfo?._id}`}
            />
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem disabled>{userInfo?.username}</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogOut fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
