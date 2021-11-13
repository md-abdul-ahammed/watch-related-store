import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { Button } from '@mui/material';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import MyOrders from '../MyOrders/MyOrders';
import Pay from '../Pay/Pay';
import ManageAllOrders from '../ManageAllOrders/ManageAllOrders';
import Review from '../Review/Review';
import AddAProduct from '../AddAProduct/AddAProduct';
import ManageProducts from '../ManageProducts/ManageProducts';
import useAuth from '../../../hooks/useAuth';
import AdminRoute from '../../Login/Login/AdminRoute/AdminRoute';


const drawerWidth = 240;


function Dashboard(props) {
    const { window } = props;
    const { admin, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { path, url } = useRouteMatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div >
            <Toolbar />
            <Divider />
            <Link style={{ textDecoration: "none" }} className='d-block py-2 px-4 text-black hover-grey' to='/'>
                Home
            </Link>
            {!admin &&
                <Box >
                    <Link style={{ textDecoration: "none" }} className='d-block py-2 px-4 text-black hover-grey' to={`${url}/myOrders`}>
                        My Orders
                    </Link>
                    <Link style={{ textDecoration: "none" }} className='d-block py-2 px-4 text-black hover-grey' to={`${url}/pay`}>
                        Pay
                    </Link>
                    <Link style={{ textDecoration: "none" }} className='d-block py-2 px-4 text-black hover-grey' to={`${url}/review`}>
                        Review
                    </Link>
                    <Link style={{ textDecoration: "none" }} to='/login' className='d-block py-2 px-4 text-black hover-grey' onClick={logout}>
                        Logout
                    </Link>
                </Box>
            }

            {
                admin &&
                <Box>
                    <Link style={{ textDecoration: "none" }} to='/login' className='d-block py-2 px-4 text-black hover-grey' to={`${url}/makeAdmin`}>
                        Make Admin
                    </Link>
                    <Link style={{ textDecoration: "none" }} to='/login' className='d-block py-2 px-4 text-black hover-grey' to={`${url}/manageAllOrders`}>
                        Manage All Orders
                    </Link>
                    <Link style={{ textDecoration: "none" }} to='/login' className='d-block py-2 px-4 text-black hover-grey' to={`${url}/addAProducts`}>
                        Add A Product
                    </Link>
                    <Link style={{ textDecoration: "none" }} to='/login' className='d-block py-2 px-4 text-black hover-grey' to={`${url}/manageProducts`}>
                        Manage Products
                    </Link>
                </Box>
            }
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Responsive drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Switch>
                        <Route exact path={path}>
                            <MyOrders></MyOrders>
                        </Route>
                        <AdminRoute path={`${path}/makeAdmin`}>
                            <MakeAdmin></MakeAdmin>
                        </AdminRoute>
                        <Route path={`${path}/pay`}>
                            <Pay></Pay>
                        </Route>
                        <AdminRoute path={`${path}/manageAllOrders`}>
                            <ManageAllOrders></ManageAllOrders>
                        </AdminRoute>
                        <Route path={`${path}/myOrders`}>
                            <MyOrders></MyOrders>
                        </Route>
                        <Route path={`${path}/review`}>
                            <Review></Review>
                        </Route>
                        <AdminRoute path={`${path}/addAProducts`}>
                            <AddAProduct></AddAProduct>
                        </AdminRoute>
                        <AdminRoute path={`${path}/manageProducts`}>
                            <ManageProducts></ManageProducts>
                        </AdminRoute>
                    </Switch>
                </Box>
            </Box>
        </>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
