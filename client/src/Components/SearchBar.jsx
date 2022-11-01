import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getNameDog } from '../Redux/Actions/Action';
//import './SearchBar.css';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

//new bar
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import DrawerComp from "./Drawer";
import FormControl from '@mui/material/FormControl';

  
// CONSTANTES ESTILOS ->
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





function SearchBar(){
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    function hanldeInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameDog(name));
    }

    //+++++++++++++++++++++++
    const theme = useTheme();
    console.log(theme);
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    console.log(isMatch);

    return (
        <>
        <AppBar sx={{ background: "transparent" }}>
            <Toolbar sx={{ width: "100%" }}>
                <PetsIcon sx={{ transform: "scale(1)"}} />
                {isMatch ? (
                    <>
                        <FormControl 
                            onClick={(e) => handleSubmit(e)}
                            sx={{ flexDirection: 'row' }} 
                            target="_blank"
                        >
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) => hanldeInputChange(e)}
                                />
                            </Search>
                            <Button 
                                variant="contained"
                                onSubmit={(e) => handleSubmit(e)}
                                type='submit' 
                            
                            >
                                Buscar
                            </Button>
                        </FormControl>
                        <DrawerComp />
                    </>
                ) : (
                    <>
                    <Typography sx={{ fontSize: "2rem", paddingLeft: "5%" }}>
                        Dogs
                    </Typography>
                    <FormControl 
                        onClick={(e) => handleSubmit(e)}
                        style={{ flexDirection: 'row' }}
                        target="_blank"
                    >
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => hanldeInputChange(e)}
                            />
                        </Search>
                        <Button 
                            variant="contained"
                            onSubmit={(e) => handleSubmit(e)}
                            type='submit' 
                        >
                            Buscar
                        </Button>
                    </FormControl>
                    <Link to={'./creation'} style={{  marginLeft: "18%" }}>
                        <Button sx={{ marginLeft: "auto" }} variant="contained">
                            crear perro
                        </Button>
                    </Link>
                    <Button sx={{ marginLeft: "auto" }} variant="contained">
                        Login
                    </Button>
                    <Button sx={{ marginLeft: "10px" }} variant="contained">
                        SignUp
                    </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
        </>
    )
}
export default SearchBar;