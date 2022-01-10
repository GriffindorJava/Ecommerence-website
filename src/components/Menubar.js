import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { Link } from 'react-router-dom';
import LoginCard from './LoginCard';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../services/user/auth/authActions'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const categories = ['Wino', 'Whisky', 'Wódka', 'Likier'];



const Menubar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElNav2, setAnchorElNav2] = React.useState(null);
    const [anchorElCat, setAnchorElCat] = React.useState(null);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenNavMenu2 = (event) => {
        setAnchorElNav2(event.currentTarget);
    };
    const handleOpenCatMenu = (event) => {
        setAnchorElCat(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseNavMenu2 = () => {
        setAnchorElNav2(null);
    };
    const handleCloseCatMenu = () => {
        setAnchorElCat(null);
    };

    window.addEventListener('storage', e => console.log(e))

    const logout = () => {
      dispatch(logoutUser());
    };

    const loginMenu = (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Login">
                    <IconButton
                        sx={{ color: 'white', display: 'block', fontSize: 50 }}
                        onClick={handleOpenNavMenu}
                    >
                        <Badge badgeContent={0}>
                            <AccountCircleOutlinedIcon fontSize="inherit" />
                        </Badge>
                    </IconButton >
                </Tooltip>
    
                <Menu
                    sx={{ mt: '45px' }}
                    id="login-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                >
                    <MenuItem key={'login'} disableTouchRipple disableGutters disableRipple>
                        <LoginCard />
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );
    
    const profileMenu = (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Profile">
                    <IconButton
                        sx={{ color: 'white', display: 'block', fontSize: 50 }}
                        onClick={handleOpenNavMenu2}
                    >
                        <Badge badgeContent={0}>
                            <AccountCircleOutlinedIcon fontSize="inherit" />
                        </Badge>
                    </IconButton >
                </Tooltip>
    
                <Menu
                    sx={{ mt: '45px' }}
                    id="login-appbar"
                    anchorEl={anchorElNav2}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElNav2)}
                    onClose={handleCloseNavMenu2}
                >
                    <MenuItem onClick={handleCloseNavMenu2} component={Link} to={'/account'}>
                        <ListItemIcon>
                            <PermIdentityOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        My account
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu2} component={Link} to={'/orders'}>
                        <ListItemIcon>
                            <ListAltOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        My orders
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleCloseNavMenu2} component={Link} to={'/'}>
                        <ListItemIcon onClick={logout}>
                            <LogoutOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );
    

    return (
        <AppBar position="sticky" style={{ marginBottom: 25 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* LOGO */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        component={Link} to={'/'}
                    >
                        LOGO
                    </Typography>


                    {/* CATEGORIES */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open categories">
                            <Button
                                key='Categories'
                                sx={{ mr: 2, color: 'white', display: 'block' }}
                                onClick={handleOpenCatMenu}
                            >
                                Categories
                            </Button>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="categories-appbar"
                            anchorEl={anchorElCat}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElCat)}
                            onClose={handleCloseCatMenu}
                        >
                            {categories.map((categories) => (
                                <MenuItem key={categories} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{categories}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* SEARCH */}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    {/* BASKET */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Link to={"/basket"}>
                        <Tooltip title="Basket">
                            <IconButton
                                sx={{ color: 'white', display: 'block', fontSize: 50 }}
                            >
                                <Badge badgeContent={0} color="error">
                                    <ShoppingCartOutlinedIcon fontSize="inherit" />
                                </Badge>
                            </IconButton >
                        </Tooltip>
                    </Link>

                    {/* LOGIN */}
                    {/* PROFILE */}
                    {auth.isLoggedIn ? profileMenu : loginMenu}
                    
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Menubar
