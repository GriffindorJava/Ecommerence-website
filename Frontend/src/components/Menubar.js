import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from 'react-router-dom';
import LoginCard from './LoginCard';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../services/user/auth/authActions'
import axios from "axios";


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
        paddingLeft: `calc(1em + ${theme.spacing(0)})`,
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


const Menubar = (props) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElNav2, setAnchorElNav2] = useState(null);
    const [anchorElCat, setAnchorElCat] = useState(null);
    const [cat, setCat] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const auth = useSelector((state) => state.auth);
    const quantity = useSelector((state) => state.cart.totalQuantity);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleCatPick = (id) => {
        let prev = window.location.pathname;
        handleCloseCatMenu();
        navigate('/?id=' + id);
        if (prev === '/') {
            console.log(window.location.pathname)
            window.location.reload(false);
        }
    };

    const handleLogo = () => {
        let prev = window.location.pathname;
        navigate('/');
        if (prev === '/') {
            window.location.reload(false);
        }
    };

    const logout = () => {
        handleCloseNavMenu2();
        console.log("L1")
        dispatch(logoutUser());
        console.log("LOGOUT")
    };

    const handleSearchChange = e => {
        setSearchValue(e.target.value);
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = (e) => {
        console.log("SEARCH", searchValue);
        navigate('/?q=' + searchValue);
        props.rerender();
    };

    const getCategories = () => {
        axios.get('http://localhost:8080/test/categories').then(res => {
            const categories = res.data;
            setCat(categories);
        })
    };


    useEffect(() => {
        let url = new URL(window.location.href); // or construct from window.location
        let params = new URLSearchParams(url.search.slice(1));
        if (window.location.pathname !== "/") {
            setSearchValue("");
        }
        if (params.get('q')) {
            setSearchValue(params.get('q'));
        }
        getCategories();
    }, []);

    {/* */ }

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
                        <LoginCard closeMenu={handleCloseNavMenu} />
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
                    <MenuItem onClick={logout} component={Link} to={'/'}>
                        <ListItemIcon >
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
                    <Box
                        component="img"
                        sx={{
                            height: 64,
                        }}
                        src="/DrunkCatLogo.png"
                        onClick={handleLogo}
                    />
                    <Box />
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
                            {cat.map((item) => (
                                <MenuItem key={item.id} onClick={(e) => handleCatPick(item.id)}>
                                    <Typography textAlign="center">{item.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* SEARCH */}
                    <Search>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchValue}
                            onChange={handleSearchChange}
                            onKeyPress={handleEnterPress}
                        />
                        <IconButton onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </Search>

                    {/* BASKET */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Link to={"/basket"}>
                        <Tooltip title="Basket">
                            <IconButton
                                sx={{ color: 'white', display: 'block', fontSize: 50 }}
                            >
                                <Badge badgeContent={quantity} color="error">
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
