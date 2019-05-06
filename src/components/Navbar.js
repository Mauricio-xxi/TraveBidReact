import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import { Nav, NavItem, Navbar, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, } from 'reactstrap';


class NavbarTravel extends Component {
    
  state = {
      dropdownOpen: false
    }


  toggle =  () => {
    const dropDownState = this.state.dropdownOpen;
    if (dropDownState === false){
        this.setState({
        dropdownOpen: true,
      });
    } else if (dropDownState === true){
      this.setState({
        dropdownOpen: false,
      });
    }
  }

  render() {
    const { logout, isLoggedin } = this.props;

    return (

      <div>
      {isLoggedin ? (
        <>
        <Navbar color="light" light expand="md" fixed="top">
          <Nav >
            <NavItem>
              <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem><p onClick={logout}>Logout</p> </DropdownItem>
                  <DropdownItem><Link  to="/profile">Profile</Link></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
              <h3>TravelBID</h3>
            </NavItem>
          </Nav>
        </Navbar>
        </>
      ) : (
        <> 
          <Nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </Nav> 
        </>
      )}
    </div>
    );
  }
}

export default withAuth(NavbarTravel);
