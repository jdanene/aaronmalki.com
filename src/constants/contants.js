export const PUBLIC_PAGE_KEYS = {
    'HomePage': "HomePage",
    'CurrentListingsPage': "CurrentListingsPage",
    'BuyersPage': 'BuyersPage',
    'SellersPage': 'SellersPage',
    'ContactUsPage': 'ContactUsPage',
    'LeasePage': 'LeasePage',
    'BlogPage': 'BlogPage',
};

export const pageToPathName = {
    'HomePage': "/",
    'CurrentListingsPage': "/listings",
    'BuyersPage': '/buy',
    'SellersPage': '/sell',
    'ContactUsPage': '/contact',
    'LeasePage': '/lease',
    'BlogPage': '/blog',
    'AdminSignUpPage': '/admin/signup',
    'AdminLoginPage': '/admin/login',
    'AdminPage': '/admin',
    'ManageBlogPage': '/admin/manage-blog',
    'AdminSettingsPage': '/admin/settings',
    'ManageHomePage': '/admin/manage-home',
    'ManageLeasePage': '/admin/manage-lease',
    'ManageBuyersPage': '/admin/manage-buyers',
    'ManageSellersPage': '/admin/manage-sellers',
    'ManageCurrentListingsPage': '/admin/manage-listings'

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
    'AdminSettingsPage': 'settings',
    'ManageHomePage': 'manage-home',
    'ManageLeasePage': 'manage-lease',
    'ManageBuyersPage': 'manage-buyers',
    'ManageSellersPage': 'manage-sellers',
    'ManageCurrentListingsPage': 'manage-listings'

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
    '/admin': 'AdminPage',
    '/admin/manage-blog': 'ManageBlogPage',
    '/admin/settings': 'AdminSettingsPage',
    '/admin/manage-home': 'ManageHomePage',
    '/admin/manage-lease': 'ManageLeasePage',
    '/admin/manage-buyers': 'ManageBuyersPage',
    '/admin/manage-sellers': 'ManageSellersPage',
    '/admin/manage-listings': 'ManageCurrentListingsPage'
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
    news: {title: "In The News", path: `${pageToPathName.BlogPage}/${blog_categories.news}`},
    rental_guide: {title: "Rental Guides", path: `${pageToPathName.BlogPage}/${blog_categories.rental_guide}`},
    buying_tips: {title: "Buying Tips", path: `${pageToPathName.BlogPage}/${blog_categories.buying_tips}`},
    lifestyle: {title: "Lifestyle & Design", path: `${pageToPathName.BlogPage}/${blog_categories.lifestyle}`}
};

export const blog_states = {
    featured: "featured",
    posts: "posts",
    main_featured: "main_featured"
};

export const DB_NODES = {
    inquiries: 'inquiries',
    blogPosts: 'blogPosts',
    settings: 'settings',
    pages: 'pages'
};

export const DB_NODES_PAGES = {
    "homePage": "homePage",
    "leasePage": "leasePage",
    "buyersPage": "buyersPage",
    "settings": "settings"
};

export const DB_KEYS_HOME_PAGE = {
    aboutMe: "aboutMe",
    pageTitle: "pageTitle",
    profilePic: "profilePic",
    backgroundPic: "backgroundPic",
    professionalTitle: "professionalTitle"
};


export const DB_KEYS_BUYERS_PAGE = {
    backgroundPic: "backgroundPic",
    formHeading: "formHeading",
    leftParagraph: "leftParagraph",
    leftPicture: "leftPicture",
    leftTitle: "leftTitle",
    pageTitle: "pageTitle",
    rightParagraph: "rightParagraph",
    rightPicture: "rightPicture",
    rightTitle: "rightTitle"

};

export const DB_FORMATS = {
    "multiPartText": "multiPartText",
    "plainText": "plainText",
    "file": "file",
    "fileArray": "fileArray"
};

export const DB_HOME_FORMATS = {
        aboutMe: DB_FORMATS.multiPartText,
    pageTitle: DB_FORMATS.multiPartText,
    profilePic:DB_FORMATS.file,
    backgroundPic: DB_FORMATS.file,
    professionalTitle: DB_FORMATS.plainText

};




export const DB_KEYS_SETTINGS_PAGE = {
    license:'license',
    address:'address',
    phoneNumber:'phoneNumber',
    email:'email',
    socialMedia:'socialMedia',
    companyName:'companyName',
    seo:'seo'
};
// the keys that are multipart text
export const DB_BUYERS_FORMATS = {
    backgroundPic: DB_FORMATS.file,
    formHeading: DB_FORMATS.plainText,
    leftParagraph: DB_FORMATS.multiPartText,
    leftPicture: DB_FORMATS.file,
    leftTitle: DB_FORMATS.plainText,
    pageTitle: DB_FORMATS.multiPartText,
    rightParagraph: DB_FORMATS.multiPartText,
    rightPicture: DB_FORMATS.file,
    rightTitle: DB_FORMATS.plainText
};


export const DB_KEYS_LEASE_PAGE = {
    pageTitle: "pageTitle",
    backgroundPic: "backgroundPic",
    imageCarousel: "imageCarousel",
    mainRightTitle: "mainRightTitle",
    mainRightParagraph: "mainRightParagraph",
    secondaryRightTitle: "secondaryRightTitle",
    secondaryRightParagraph: "secondaryRightParagraph",
    mainLeftTitle: "mainLeftTitle",
    mainLeftParagraph: "mainLeftParagraph",
    formHeading: "formHeading"
};

export const DB_LEASE_FORMATS = {
    pageTitle: DB_FORMATS.multiPartText,
    backgroundPic: DB_FORMATS.file,
    imageCarousel: DB_FORMATS.fileArray,
    mainRightTitle: DB_FORMATS.plainText,
    mainRightParagraph: DB_FORMATS.multiPartText,
    secondaryRightTitle: DB_FORMATS.plainText,
    secondaryRightParagraph: DB_FORMATS.multiPartText,
    mainLeftTitle: DB_FORMATS.plainText,
    mainLeftParagraph: DB_FORMATS.multiPartText,
    formHeading: DB_FORMATS.plainText
};


export const DB_MULTIPART_TEXT_KEY = {
    value: "value",
    secondaryValues: "secondaryValues"
};


export const MESSAGE_TYPES = {
    'general':'general',
    'lease':'lease',
    'buy':'buy'
};