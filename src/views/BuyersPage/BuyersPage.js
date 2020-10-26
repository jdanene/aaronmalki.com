import React, { useContext, useEffect, useState } from "react"
import BuyerForm from "./components/BuyerForm";
import {colorScheme} from "../../constants";

const BuyersPage = ()=>{

    return <div style={{display:"flex",flexDirection:"column",  width:'100%',height:'100%',  alignContent:"center", alignItems:"center",backgroundColor: "white"}}>
        <div style={{  marginTop: '90px', marginBottom: '45px', display:'flex', width:"90%", justifyContent:'center', alignItems:'center'}}>
        <BuyerForm/>
        </div>
    </div>

};

export default BuyersPage;