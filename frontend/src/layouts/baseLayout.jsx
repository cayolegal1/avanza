import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';

const pages = [
  {title: 'Personas', to: '/people'},
  {title: 'Habitaciones', to: '/rooms'},
  {title: 'Reservas', to: '/bookings'},
];

export const BaseLayout = ({children}) => {
  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              {pages.map((page) => (
                <Button key={page.title} sx={{ my: 2, display: "block" }}>
                  <NavLink
                    to={page.to}
                    style={({ isActive }) => ({
                      color: "white",
                      textDecoration: isActive ? "underline" : "none",
                      fontWeight: isActive ? "bold" : "light",
                    })}
                  >
                    {page.title}
                  </NavLink>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </Box>
  );
}