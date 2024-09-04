import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, createTheme, ThemeProvider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Style.css';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [colors, setColors] = useState({ primary_color: '#FFFFFF', secundary_color: '#FFFFFF' });
    const [logo, setLogo] = useState({ publicUrl: '' });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const fetchData = async () => {
            const { data: logoData, error: logoError } = await supabase
                .storage
                .from('logo')
                .getPublicUrl('default/logo.png');

            if (logoData) {
                setLogo(logoData);
            }

            const { data: colorData, error: colorError } = await supabase
                .from('colors')
                .select('*')
                .eq('id', 1)
                .single();

            if (colorData) {
                setColors(colorData);
            }
        };

        fetchData();
    }, []);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = () => (
        <List>
            <ListItem button component={Link} to="/" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/cadastro-imovel" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Cadastrar Imóvel" />
            </ListItem>
            <ListItem button component={Link} to="/detalhes" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Detalhes" />
            </ListItem>
        </List>
    );

    const customTheme = createTheme({
        palette: {
            primary: {
                main: colors.primary_color,
            },
            secondary: {
                main: colors.secundary_color,
            },
        },
    });

    return (
        <ThemeProvider theme={customTheme}>
            <AppBar sx={{ backgroundColor: colors.primary_color, color: colors.secundary_color }} position="fixed">
                <Toolbar className='custom-toolbar'>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Link to="/" className="navbar-logo">
                        <img src={logo.publicUrl} alt="Logo" />
                    </Link>
                    <div className="navbar-links" sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Link to="/" style={{ color: customTheme.palette.secondary.main }}>Home</Link>
                        <Link to="/cadastro-imovel" style={{ color: customTheme.palette.secondary.main }}>Cadastrar Imóvel</Link>
                        <Link to="/detalhes" style={{ color: customTheme.palette.secondary.main }}>Detalhes</Link>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerList()}
            </Drawer>
        </ThemeProvider>
    );
}

export default Navbar;
