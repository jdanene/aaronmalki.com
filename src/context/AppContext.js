import React, {createContext, useState, useEffect} from "react"


const AppContext = createContext();


// PlaceId Finder: https://jsfiddle.net/api/post/library/pure/
const initial = {
            address: {
                line1: "891 Beech Street",
                line2: "San Francisco CA 94109",
                position:
                    {
                        lat: 37.806279,
                        lng: -122.423516,
                        place_id:"ChIJGYoj1CSq3IAR4O_Npf_PZTY"
                    }
            },
            phoneNumber: {
                dash: "(909) 771-6881",
                dot: "909.771.6881"
            },
            email: "aaronmalki@malki.com"
        };

const useApp = () => {
    const [state, setState] = useState(initial);

    useEffect(()=>{
        setState(initial);
    },[]);
    return state
};

const AppContextProvider = ({children}) => {
    const state = useApp();
    return <AppContext.Provider value={state}>{children}</AppContext.Provider>
};

export {
    AppContext,
    AppContextProvider
}