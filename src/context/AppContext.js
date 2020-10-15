import React, {createContext, useState, useEffect} from "react"


const AppContext = createContext();

const useApp = () => {
    const [currentPage, setCurrentPage] = useState("HomePage");
    const changePage = (newPage) => {
        setCurrentPage(newPage);
    };

    return {
        currentPage,
        changePage
    }
};

const AppContextProvider = ({children}) => {
    const state = useApp();
    return <AppContext.Provider value={state}>{children}</AppContext.Provider>
};

export {
    AppContext,
    AppContextProvider
}