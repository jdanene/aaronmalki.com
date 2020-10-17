import React, { useContext, useEffect, useState, useRef } from "react"
import "./HomePage.scss"
import {DownArrow} from "../../components/DownArrow";
import useWindowDimensions from "./useWindowDimensions";
import HomePageTopHalfInfo from "./HomePageTopHalfInfo";

const HomePage = ()=>{
    const id = "id123";
    const inputRef = useRef();
  const switchCount = useWindowDimensions("id123");

    const [topHalf_bottomPosn, setTopHalf_bottomPosn] = useState(undefined);

    useEffect(()=>{
        console.log(switchCount)

    },[switchCount]);

    useEffect(()=>{

        inputRef.current&&setTopHalf_bottomPosn(inputRef.current.getBoundingClientRect().bottom);
        console.log(topHalf_bottomPosn);

    },[inputRef.current,topHalf_bottomPosn]);

        //https://www.pluralsight.com/tech-blog/getting-size-and-position-of-an-element-in-react/
//https://stackoverflow.com/questions/32667847/get-divs-offsettop-positions-in-react
    return <div className={"homepage__container"}>
        <div id={"id123"}  ref={inputRef}  className={"homepage_generalInfo__container_top"}>
                    <HomePageTopHalfInfo/>


            <DownArrow posnOfContainter={ topHalf_bottomPosn}/>
        </div>
                <div className={"homepage_generalInfo__container_bottom"}>
                    This is the home pagekln
        </div>
    </div>

};

export default HomePage;