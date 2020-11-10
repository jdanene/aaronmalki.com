import React, {useState, useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import Typography from "@material-ui/core/Typography";
import LeaseImg from "resources/images/leasePage/leasingpagepic2.png"
import LeaseImg2 from "resources/images/leasePage/leasingpagepic3.png"
import LeaseImg3 from "resources/images/leasePage/leasingpagepic4.png"

import {makeStyles} from '@material-ui/core/styles';
import ClickArrow from "./ClickArrow";
import "./ImageCarousel.css"
//https://www.npmjs.com/package/react-responsive-carousel

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '2.5px',
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden"
    },
    img: {
        borderRadius: '2.5px',
        flexShrink: 0,
        width: '100%',
        height: '100%',
    },
    thumbImage: {

    },
    arrowButton:{
        background: "rgba(0,0,0,.25)",
        '&:hover': {
            background: "rgba(0,0,0,.4)",
    }
    }
}));

const IMAGES = [LeaseImg, LeaseImg2,LeaseImg3];

const ImageCarousel = () => {

    const classes = useStyles();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    const next = () => {
        setCurrentSlide((currentSlide + 1) % IMAGES.length);
    };

    const prev = () => {
        setCurrentSlide(Math.abs((currentSlide - 1) % IMAGES.length));
    };

    //only called when a thumbnail is pressed
    const updateCurrentSlide = (index) => {
        setCurrentSlide(index)
    };

    const onFocus = () => {
        setIsFocused(true)
    };

    const onBlur = () => {

        setIsFocused(false)
    };

    useEffect(() => {
        if (!isFocused) {
            const invtl = setInterval(() => {
                next();
            }, 5000);

            return () => clearInterval(invtl)
        }

    }, [currentSlide, isFocused]);

    const customRenderThumb = (children) =>
        children.map((item) => {
            return <ThumbImg className={classes.thumbImage} item={item} currentSlide={currentSlide}/>
        });

    const customRenderItem = (item, props) => {
        console.log(item.type, props)
        return <item.type style={{borderRadius: '5px'}} {...item.props} {...props} />
    };
    return (
        <div onFocus={onFocus} onBlur={onBlur} onMouseEnter={onFocus} onMouseLeave={onBlur} onMouseOver={onFocus}
             onMouseOut={onBlur}>


            <Carousel


                renderItem={customRenderItem}

                selectedItem={currentSlide}
                onChange={updateCurrentSlide}
                renderThumbs={customRenderThumb}
                statusFormatter={(current, total) => null}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    (
                        <ClickArrow direction={"left"} onClickHandler={prev} className={classes.arrowButton}/>
                    )
                }
                renderArrowNext={(onClickHandler, hasPrev, label) =>
                    (
                        <ClickArrow direction={"right"} onClickHandler={next} className={classes.arrowButton}/>
                    )
                }

                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    return null
                }}

            >
                {IMAGES.map((image, index) => <div className={classes.container} src={image} key={index} index={index}>
                    <img src={image} className={classes.img}/>
                </div>)
                }

            </Carousel>
        </div>
    );

};

const ThumbImg = ({item, currentSlide, className}) => {
    const [isHover, setHover] = useState(false);
    const onHover = () => setHover(true);
    const onBlur = () => setHover(false);

    return <div onFocus={onHover} onBlur={onBlur} onMouseEnter={onHover} onMouseLeave={onBlur} onMouseOver={onHover}> <img
                onMouseOut={onBlur} className={className} src={item.props.src}
                style={{opacity: item.props.index === currentSlide || isHover? 1 : 0.5}}/></div>;
};

export default ImageCarousel;