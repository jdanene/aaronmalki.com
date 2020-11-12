export const pageToPathName = {
    'HomePage': "/",
    'CurrentListingsPage': "/listings",
    'BuyersPage': '/buy',
    'SellersPage': '/sell',
    'ContactUsPage': '/contact',
    'LeasePage': '/lease',
    'BlogPage': '/blog',
    'AdminSignUpPage':'/admin/signup',
    'AdminLoginPage': '/admin/login',
    'AdminPage':'/admin',
    'ManageBlogPage':'/admin/manage-blog',
    'AdminSettingsPage':'/admin/settings',
    'ManageHomePage':'/admin/manage-home'

};

export const pageToPageName = {
    'HomePage': 'Home',
    'CurrentListingsPage': 'Listings',
    'BuyersPage': 'Buy',
    'SellersPage': 'Sell',
    'ContactUsPage': 'Contact Us',
    'LeasePage': 'Lease',
    'BlogPage': 'Blog',
    'AdminSignUp': 'admin-sign-up',
    'AdminLoginPage': 'admin-login',
    'Admin': 'admins',
    'ManageBlogPage': 'manage-blog',
    'AdminSettingsPage':'settings',
    'ManageHomePage':'manage-home'
};

export const pathToPageName = {
    "/": 'HomePage',
    "/listings": 'CurrentListingsPage',
    '/buy': 'BuyersPage',
    '/sell': 'SellersPage',
    '/contact': 'ContactUsPage',
    '/lease': 'LeasePage',
    '/blog': 'BlogPage',
    '/admin/signup': 'AdminSignUpPage',
    '/admin/login': 'AdminLoginPage',
    '/admin':'AdminPage',
    '/admin/manage-blog':'ManageBlogPage',
    '/admin/settings':'AdminSettingsPage',
    '/admin/manage-home':'ManageHomePage'
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

export const blog_categories_reverse = {
    news: "news",
    "rental-guide": "rental_guide",
    "buying-tips": "buying_tips",
    lifestyle: "lifestyle"
};

export const blog_categories_keysOnly = {
    news: "news",
    rental_guide: "rental_guide",
    buying_tips: "buying_tips",
    lifestyle: "lifestyle"
};





export const blog_category_to_string = {
    news: {title:"In The News",path:`${pageToPathName.BlogPage}/${blog_categories.news}`},
    rental_guide: {title:"Rental Guides",path:`${pageToPathName.BlogPage}/${blog_categories.rental_guide}`},
    buying_tips: {title:"Buying Tips",path:`${pageToPathName.BlogPage}/${blog_categories.buying_tips}`},
    lifestyle: {title:"Lifestyle & Design",path:`${pageToPathName.BlogPage}/${blog_categories.lifestyle}`}
};

export const blog_states = {
    featured: "featured",
    posts: "posts",
    main_featured: "main_featured"
};

export const DB_NODES = {
    inquiries:'inquiries',
    blogPosts:'blogPosts',
    settings:'settings'
};
