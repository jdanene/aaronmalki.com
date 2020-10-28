export const pageToPathName = {
    'HomePage': "/",
    'CurrentListingsPage': "/listings",
    'BuyersPage': '/buy',
    'SellersPage': '/sell',
    'ContactUsPage': '/contact',
    'LeasePage': '/lease',
    'BlogPage': '/blog'
};

export const pageToPageName = {
    'HomePage': 'Home',
    'CurrentListingsPage': 'Current Listings',
    'BuyersPage': 'Buy',
    'SellersPage': 'Sell',
    'ContactUsPage': 'Contact Us',
    'LeasePage': 'Lease',
    'BlogPage': 'Blog'
};

export const pathToPageName = {
    "/": 'HomePage',
    "/listings": 'CurrentListingsPage',
    '/buy': 'BuyersPage',
    '/sell': 'SellersPage',
    '/contact': 'ContactUsPage',
    '/lease': 'LeasePage',
    '/blog': 'BlogPage'

};


export const navBarParams = {
    innerNavbarHeight: "45px"
};

export const blog_categories = {
    news: "news",
    rental_guide: "rental-guide",
    buying_tips: "buying-tips",
    lifestyle: "lifestyle"
};

export const blog_category_to_string = {
    news: {title:"In The News",path:`${pageToPathName.BlogPage}/${blog_categories.news}`},
    rental_guide: {title:"Rental Guides",path:`${pageToPathName.BlogPage}/${blog_categories.rental_guide}`},
    buying_tips: {title:"Buying Tips",path:`${pageToPathName.BlogPage}/${blog_categories.buying_tips}`},
    lifestyle: {title:"Lifestyle & Design",path:`${pageToPathName.BlogPage}/${blog_categories.lifestyle}`}
};

export const blog_states = {
    delete: "delete",
    review: "review",
    featured: "featured",
    posts: "posts",
    main_featured: "main_featured"
};