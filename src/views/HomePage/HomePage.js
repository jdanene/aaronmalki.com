import React, { useContext, useEffect, useState } from "react"
import "./HomePage.scss"
import {DownArrow} from "../../components/DownArrow";

const HomePage = ()=>{

    return <div className={"homepage__container"}>
        <div className={"homepage_generalInfo__container_top"}>
                    This is the home pagekln
            <DownArrow/>
        </div>
                <div className={"homepage_generalInfo__container_bottom"}>
                    This is the home pagekln
        </div>
    </div>

};

export default HomePage;