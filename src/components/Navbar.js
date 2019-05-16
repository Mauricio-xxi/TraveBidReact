import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import { Nav, Navbar, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, } from 'reactstrap';
import styled from 'styled-components';
import SearchOffers from '../components/offers/SearchOffers'
import '../stylesheets/nav.css'

const NavElements = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  `;

const TitleLinkToHome = styled.div`
  width: 40%;
`;

class NavbarTravel extends Component {
    
  state = {
      dropdownOpen: false,
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
        <Navbar color="light" light expand="lg" fixed="top">
          <Nav>
          <NavElements>
              <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem><p onClick={logout}>Logout</p> </DropdownItem>
                  <DropdownItem><Link  to="/profile">Profile</Link></DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <TitleLinkToHome><Link to="/private"><h3>TravelBID</h3></Link></TitleLinkToHome> 
              <SearchOffers />
              </NavElements>
              
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
