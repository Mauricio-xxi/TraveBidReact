import React, { Component } from 'react'
import { ReactComponent as TV } from "../../../src/assets/television.svg";
import { ReactComponent as Wifi } from "../../../src/assets/wifi.svg";
import { ReactComponent as Air } from "../../../src/assets/acondicionador-de-aire.svg";
import { ReactComponent as Garage } from "../../../src/assets/garaje.svg";
import { ReactComponent as HotWater } from "../../../src/assets/termometro.svg";
import { ReactComponent as Washer } from "../../../src/assets/lavadora.svg";
import { ReactComponent as Pool } from "../../../src/assets/piscina.svg";
import { ReactComponent as PrivateBathroom } from "../../../src/assets/ducha.svg";
import { ReactComponent as Wheelchair } from "../../../src/assets/silla-de-ruedas.svg";
import { ReactComponent as Smoke } from "../../../src/assets/cigarrete.svg";
import { ReactComponent as Pet } from "../../../src/assets/mascotas.svg";
import { ReactComponent as Couples } from "../../../src/assets/pareja.svg";
import styled from 'styled-components';

const FacilitiesStyle = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:space-around;
`

export default class Comodities extends Component {
  

  render() {
    const { tv, air, garage, pet, pool, privateBathroom, smoke, termo, wheelchair, wifi, washer, couples } = this.props.icons
    return (
      <FacilitiesStyle>
        {tv === "True" ? <TV/>:<></>}
        {wifi === "True" ? <Wifi/>:<></>}
        {air === "True" ? <Air/>:<></>}
        {garage === "True" ? <Garage/>:<></>}
        {termo === "True" ? <HotWater/>:<></>}
        {washer === "True" ? <Washer/>:<></>}
        {pool === "True" ? <Pool/>:<></>}
        {privateBathroom === "True" ? <PrivateBathroom/>:<></>}
        {wheelchair === "True" ? <Wheelchair/>:<></>}
        {smoke === "True" ? <Smoke/>:<></>}
        {pet === "True" ? <Pet/>:<></>}
        {couples === "True" ? <Couples/>:<></>}
      </FacilitiesStyle>
    )
  }
}
