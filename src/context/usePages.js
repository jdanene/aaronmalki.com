import React, {useEffect, useState} from "react"
import {DB_NODES, DB_NODES_PAGES} from "../constants/contants";
import downloadFromDb from "../components/Database/downloadFromDb";
import * as unionFind from 'union-find';

const pages = {
    "homePage": {
        "backgroundPic": "https://picsum.photos/seed/picsum/400/400",
        "profilePic": "https://picsum.photos/seed/picsum/400/400",
        "professionalTitle": "Bitch",
        "aboutMe": {
            "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend felis et efficitur vehicula. Vivamus eget est vitae ex mattis aliquet vitae eu ipsum. Nulla sed urna purus. Morbi eu turpis non mauris vestibulum ullamcorper in sed nunc. Duis ut nisi est. Morbi quis efficitur nisi. Etiam libero neque, auctor at congue auctor, blandit non orci. Duis feugiat facilisis libero, ac aliquet libero congue condimentum. Proin volutpat est at nisi sollicitudin consequat. Cras facilisis pharetra finibus. Nullam aliquam in mi et lobortis. Suspendisse at ullamcorper libero. Phasellus aliquet quam tincidunt arcu finibus, quis aliquam nisi imperdiet.",
            "secondaryValues": {
                "0": "Favorite Resturaunt: Penis Head"
            }
        },
        "pageTitle": {
            "value": "Malki Real Estate",
            "secondaryValues": {
                "0": "Welcome Home"
            }
        }
    },
    "leasePage": {
        "pageTitle": {
            "value": "Stress Free Leasing.",
        },
        "backgroundPic": "https://picsum.photos/seed/picsum/400/400",
        "imageCarousel": {
            "0": "https://picsum.photos/seed/picsum/400/400",
            "1": "https://picsum.photos/seed/picsum/400/400",
            "2": "https://picsum.photos/seed/picsum/400/400",
            "3": "https://picsum.photos/seed/picsum/400/400",
            "4": "https://picsum.photos/seed/picsum/400/400",
            "5": "https://picsum.photos/seed/picsum/400/400"
        },
        "mainRightTitle": "Looking to Lease?",
        "mainRightParagraph": {
            "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend velit tortor, vitae mollis massa pharetra ut. Maecenas eget facilisis magna, vitae facilisis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean nec sapien non velit convallis sagittis. Sed lectus ex, eleifend"
        },
        "secondaryRightTitle": "Not looking to buy just yet",
        "secondaryRightParagraph": {
            "value": "No sweat! Finding a place you call home can be a daunting task. San Francisco is one of the hottest rental markets (if not the hottest) in the country. With so many moving parts, it can be overwhelming trying to find the perfect fit. Luckily, I have an extensive list of available apartments right at my finger tips.",
            "secondaryValues": {
                "0": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend velit tortor, vitae mollis massa pharetra ut. Maecenas eget facilisis magna, vitae facilisis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean nec sapien non velit convallis sagittis. Sed lectus ex, eleifend"
            }
        },
        "mainLeftTitle": "Where do I begin?",
        "mainLeftParagraph": {
            "value": "Asking these questions before you begin your search can be very helpful: Where do I want to move? What’s my realistic budget? Do I need a studio or a 1 bedroom? And what’s the deal with rent control?! How early should I begin my search? There are so many questions to be had! That’s why I’m here to help guide you through your search."
        },
        "formHeading": "Fill out the form below and let the showings begin!"
    },
    "buyersPage": {
        "pageTitle": {
            "value": "Buying a home,",
            "secondaryValues": {
                "0": "The Easy Way"
            }
        },
        "backgroundPic": "https://picsum.photos/seed/picsum/400/400",
        "rightPicture": "https://picsum.photos/seed/picsum/400/400",
        "leftPicture": "https://picsum.photos/seed/picsum/400/400",
        "leftTitle": "Finding the Right Hime",
        "rightTitle": "Where do I Start",
        "leftParagraph": {
            "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "secondaryValues": {
                "0": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
        },
        "rightParagraph": {
            "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "secondaryValues": {
                "0": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
        },
        "formHeading": "Let us know what you are looking for"
    },
    "settings": {
        "companyName": "Malki Real Estate",
        "license": "02128632",
        "address": {
            "line1": "3222 25th Street",
            "line2": "San Francisco, CA 94110",
            "position": {
                "lat": 37.751161,
                "lng": -122.414495,
                "place_id": "ChIJ6wUPakZ-j4AR1i8kOrVZqUk"
            }
        },
        "phoneNumber": {
            "dash": "(909) 771-6881",
            "dot": "909.771.6881",
            "tel": "+19097716881",
            "all_dash": "909-771-6881"
        },
        "email": "acmalki19@gmail.com",
        "socialMedia": {
            "instagram": "https://www.instagram.com/aaron.malki/",
            "linkedin": "https://www.linkedin.com/in/aaron-malki-761b3165/",
            "facebook": "https://www.facebook.com/aaron.malki/"
        },
        "seo": {
            "HomePage":
                {
                    "title": "Malki Real Estate",
                    "description": "Malki Real Estate Be Best"
                },
            "LeasePage":
                {
                    "title": "Malki Real Estate",
                    "description": "Malki Real Estate Be Best"
                },
            "BuyersPage":
                {
                    "title": "Malki Real Estate",
                    "description": "Malki Real Estate Be Best"
                },
            "ContactUsPage":
                {
                    "title": "Malki Real Estate",
                    "description": "Malki Real Estate Be Best"
                },
            "BlogPage": {
                "news": {
                    "title": "Malki Real Estate",
                    "description": "Malki Real Estate Be Best"
                },
                "rental_guide": {
                    "title": "Malki Real Estate",
                    "description": "Malki Real Estate Be Best"
                },
                "buying_tips": {
                    "title": "Malki Real Estate",
                    "description": "Malki Real Estate Be Best"
                },
                "lifestyle": {
                    "title": "Malki Real Estate",
                    "description": "Malki Real Estate Be Best"
                }
            }
        },
    }
};


const usePages = () => {
    const [pageState, setPageState] = useState({});
    const [pageStateHasLoaded, setPageStateHasLoaded] = useState(false);


    useEffect(() => {
        downloadFromDb(DB_NODES.pages).then((val) => {
            setPageState(val);
            setPageStateHasLoaded(true);
        }).catch((e) => alert(`Fatal error could not get page data from db: ${e}`))
    }, []);

    useEffect(() => {
    }, [pageState])

    const changePageState = (page) => (newState) => {
        let target = {...pageState[page], ...newState};
        setPageState({...pageState, [page]: target});
    };


    return {
        pageState: {
            ...pageState,
            changeHomePageState: changePageState(DB_NODES_PAGES.homePage),
            changeBuyersPageState: changePageState(DB_NODES_PAGES.buyersPage),
            changeLeasePageState: changePageState(DB_NODES_PAGES.leasePage),
            changeSettings: changePageState(DB_NODES_PAGES.settings)
        },
        pageStateHasLoaded
    }
};

export default usePages;