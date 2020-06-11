import React from 'react';
import { Navbar }  from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';

const NavBar: React.FC = () => {

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link className={classes.logoutBtn} to='/'>StarWars App</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <>
          <div>
            <Link className={classes.logoutBtn} to='/films'>Films</Link>
            <Link className={classes.logoutBtn} to="/people">People</Link>
          </div>
        </>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;