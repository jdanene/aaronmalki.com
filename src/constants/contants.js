import {SellersPage,HomePage, CurrentListingsPage, ContactUsPage, BuyersPage} from "../views";

export const pageToPathName = {
    'HomePage': "/",
    'CurrentListingsPage': "/listings",
    'BuyersPage': '/buy',
    'SellersPage': '/sell',
    'ContactUsPage': '/contact'
};

export const pageToPageName = {
    'HomePage': 'Home',
    'CurrentListingsPage': 'Current Listings',
    'BuyersPage': 'Buyers',
    'SellersPage': 'Sellers',
    'ContactUsPage': 'Contact Us'
};

export const pathToPageName = {
    "/": 'HomePage',
    "/listings": 'CurrentListingsPage',
    '/buy': 'BuyersPage',
    '/sell': 'SellersPage',
    '/contact': 'ContactUsPage'
};




export const navBarParams = {
    innerNavbarHeight: "45px"
}

