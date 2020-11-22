import React, {useState, useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import Paper from '@material-ui/core/Paper';

import {makeStyles} from '@material-ui/core/styles';
import ClickArrow from "./ClickArrow";
import "./ImageCarousel.css"
//https://www.npmjs.com/package/react-responsive-carousel

const useStyles = makeStyles((theme) => ({
    container: {

        borderRadius: '2.5px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        maxHeight: "450px",
        width:'100%'
    },
    img: {
        borderRadius: '2.5px',
        flexShrink: 0,
        width: '100%',
        height: '100%',
    },
    thumbImage: {},
    arrowButton: {
        background: "rgba(0,0,0,.25)",
        '&:hover': {
            background: "rgba(0,0,0,.4)",
        }
    },
    root:{
        paddingLeft:theme.spacing(1),
        paddingRight:theme.spacing(1),
        maxWidth:'100vw',
        width:'100%'
    }
}));


const ImageCarousel = ({imgArray}) => {

    const classes = useStyles();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    const next = () => {
        setCurrentSlide((currentSlide + 1) % imgArray.length);
    };

    const prev = () => {
        setCurrentSlide(Math.abs((currentSlide - 1) % imgArray.length));
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
        children.map((item,index) => {
            return <ThumbImg  item={item} key={index} currentSlide={currentSlide}/>
        });

    const customRenderItem = (item, props) => {
        return <item.type style={{borderRadius: '5px'}} {...item.props} {...props} />
    };
    return (
        <div onFocus={onFocus} onBlur={onBlur} onMouseEnter={onFocus} onMouseLeave={onBlur} onMouseOver={onFocus}
             onMouseOut={onBlur} className={classes.root}>


            <Carousel


                renderItem={customRenderItem}

                selectedItem={currentSlide}
                onChange={updateCurrentSlide}
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
                {imgArray.map((image, index) => <div className={classes.container} src={image} key={index}
                                                     index={index}>
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

    return (item.props.index === currentSlide || isHover ?
            <Paper style={{borderRadius: '1.25px'}} onFocus={onHover} onBlur={onBlur} onMouseEnter={onHover}
                   onMouseLeave={onBlur}
                   onMouseOver={onHover}><img
                onMouseOut={onBlur} className={className} src={item.props.src}
                style={{opacity: 1}}/></Paper>
            :
            <div onFocus={onHover} onBlur={onBlur} onMouseEnter={onHover} onMouseLeave={onBlur}
                 onMouseOver={onHover}><img
                onMouseOut={onBlur} className={className} src={item.props.src}
                style={{opacity: 0.5}}/></div>

    )


};

export default ImageCarousel;