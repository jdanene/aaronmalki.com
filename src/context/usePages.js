import React, {createContext, useState, useEffect, useContext} from "react"
import {blog_categories, blog_states, DB_NODES, DB_NODES_PAGES} from "../constants/contants";
import useBlogPosts from "./useBlogPost";
import useProvideAuth from "./use-auth";
import uploadSettingToDb from "../components/Database/uploadSettingToDb";
import downloadFromDb from "../components/Database/downloadFromDb";
import {isObject} from "../components/Utility";
import isObjectEmpty from "../components/Utility/isObjectEmpty";


const pages = {
   "homePage":{
      "backgroundPic":"https://picsum.photos/seed/picsum/400/400",
      "profilePic":"https://picsum.photos/seed/picsum/400/400",
      "professionalTitle":"Bitch",
      "aboutMe":{
         "value":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend felis et efficitur vehicula. Vivamus eget est vitae ex mattis aliquet vitae eu ipsum. Nulla sed urna purus. Morbi eu turpis non mauris vestibulum ullamcorper in sed nunc. Duis ut nisi est. Morbi quis efficitur nisi. Etiam libero neque, auctor at congue auctor, blandit non orci. Duis feugiat facilisis libero, ac aliquet libero congue condimentum. Proin volutpat est at nisi sollicitudin consequat. Cras facilisis pharetra finibus. Nullam aliquam in mi et lobortis. Suspendisse at ullamcorper libero. Phasellus aliquet quam tincidunt arcu finibus, quis aliquam nisi imperdiet.",
         "secondaryValues":{
            "0":"Favorite Resturaunt: Penis Head"
         }
      },
      "pageTitle":{
         "value":"Malki Real Estate",
         "secondaryValues":{
            "0":"Welcome Home"
         }
      }
   },
   "settings":{
      "companyName":"Malki Real Estate",
      "license":"02128632",
      "address":{
         "line1":"3222 25th Street",
         "line2":"San Francisco, CA 94110",
         "position":{
            "lat":37.751161,
            "lng":-122.414495,
            "place_id":"ChIJ6wUPakZ-j4AR1i8kOrVZqUk"
         }
      },
      "phoneNumber":{
         "dash":"(909) 771-6881",
         "dot":"909.771.6881",
         "tel":"+19097716881",
         "all_dash":"909-771-6881"
      },
      "email":"acmalki19@gmail.com",
      "socialMedia":{
         "instagram":"https://www.instagram.com/aaron.malki/",
         "linkedin":"https://www.linkedin.com/in/aaron-malki-761b3165/",
         "facebook":"https://www.facebook.com/aaron.malki/"
      }
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

    useEffect(()=>{
    },[pageState])

    const changePageState = (page) => (newState) => {
        let target = {...pageState[page],...newState};
        setPageState({...pageState, [page]:target});
    };


    return {
        pageState: {
            ...pageState,
            changeHomePageState: changePageState(DB_NODES_PAGES.homePage),
            changeBuyerPageState: changePageState(DB_NODES_PAGES.buyersPage),
            changeLeasePageState: changePageState(DB_NODES_PAGES.leasePage),
            changeSettings: changePageState(DB_NODES_PAGES.settings)
        },
        pageStateHasLoaded
    }
};

export default usePages;