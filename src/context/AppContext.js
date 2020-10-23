import React, {createContext, useState, useEffect} from "react"


const AppContext = createContext();


// PlaceId Finder: https://jsfiddle.net/api/post/library/pure/
const initial = {
            address: {
                line1: "891 Beach Street",
                line2: "San Francisco CA 94109",
                position:
                    {
                        lat: 37.806296,
                        lng: -122.423543,
                        place_id:"ChIJ5_wWhOCAhYARQhCFs7MqvmQ"
                    }
            },
            phoneNumber: {
                dash: "(909) 771-6881",
                dot: "909.771.6881",
                tel: "+19097716881",
                all_dash: "909-771-6881"
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