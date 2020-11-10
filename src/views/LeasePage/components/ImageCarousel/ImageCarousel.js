import React, {useState,useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import Typography from "@material-ui/core/Typography";
import BuyerTopImg from "resources/images/leasePage/leasingpagepic1.png"
import BuyerTopImg2 from "resources/images/leasePage/leasingpagepic2.png"
import {makeStyles} from '@material-ui/core/styles';
import ClickArrow from "./ClickArrow";

//https://www.npmjs.com/package/react-responsive-carousel

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: 2,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden"
    },
    img: {
        borderRadius: 2,
        flexShrink: 0,
        width: '100%',
        height: '100%',
    },
    thumbImage:{
        '&:focus':{
            border:'1px solid red'
        }
    }
}));


const ImageCarousel = () => {

    const classes = useStyles();
    const N = 2;
    const [currentSlide, setCurrentSlide] = useState(0);


    const next = () => {
        setCurrentSlide((currentSlide + 1) % N);
    };

    const prev = () => {
        setCurrentSlide(Math.abs((currentSlide - 1) % N));
    };

    useEffect(() => {
        const invtl = setInterval(() => {
            next();
        }, 5000);

        return () => clearInterval(invtl)
    }, [currentSlide]);

    const customRenderThumb = (children) =>
        children.map((item) => {
            console.log(item.props.src)
            return <img src={item.props.src} />;
        });

    return (
        <React.Fragment>


            <Carousel
                selectedItem={currentSlide}
                style={{borderRadius: 2}}

                 renderThumbs={customRenderThumb}
                statusFormatter={(current, total) => null}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    (
                        <ClickArrow direction={"left"} onClickHandler={prev}/>
                    )
                }
                renderArrowNext={(onClickHandler, hasPrev, label) =>
                    (
                        <ClickArrow direction={"right"} onClickHandler={next}/>
                    )
                }

                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    return null
                }}

            >
                <div className={classes.container} src={BuyerTopImg}>
                    <img src={BuyerTopImg} className={classes.img}/>
                </div>
                <div className={classes.container} src={BuyerTopImg2}>
                    <img src={BuyerTopImg2} className={classes.img}/>
                </div>
            </Carousel>
        </React.Fragment>
    );

};


export default ImageCarousel;