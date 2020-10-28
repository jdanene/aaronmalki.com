import React, {createContext, useState, useEffect} from "react"
import {  blog_categories,blog_states} from "../constants/contants";
import useBlogPosts from "./useBlogPost";
const AppContext = createContext();




// PlaceId Finder: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
const initial = {
    isAdmin: false,
    address: {
        line1: "3222 25th Street",
        line2: "San Francisco, CA 94110",
        position:
            {
                lat: 37.751161,
                lng: -122.414495,
                place_id: "ChIJ6wUPakZ-j4AR1i8kOrVZqUk"
            }
    },
    phoneNumber: {
        dash: "(909) 771-6881",
        dot: "909.771.6881",
        tel: "+19097716881",
        all_dash: "909-771-6881"
    },
    email: "acmalki19@gmail.com",
    socialMedia: {
        instagram: "https://www.instagram.com/aaron.malki/",
        linkedin: "https://www.linkedin.com/in/aaron-malki-761b3165/",
        facebook: "https://www.facebook.com/aaron.malki/"
    }
};


const useApp = () => {
    const [state, setState] = useState(initial);
    return state
};


const AppContextProvider = ({children}) => {
    const blogs = useBlogPosts();
    const state = useApp();
    return <AppContext.Provider value={{...state,...blogs}}>{children}</AppContext.Provider>
};

export {
    AppContext,
    AppContextProvider
}