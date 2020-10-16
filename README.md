This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Log

### 10.11.2020
- Set up the app
- Set up a hamburger and navigation

Next
1. App.js should just refer to home screen. So fix that up a bit
2. Hamburger needs to go to actual pages so fix that as well
3. Can easily add the "view more home" part
4. The arrow down is clunk consider --> https://ux.stackexchange.com/questions/115110/what-is-the-best-way-to-tell-users-to-scroll-down-in-browsers to get users to scroll dow. 
5. Set up color scheme. Seems to be black and white
6. Navbar changes color when scrolling.  Actually do scroll to hide navbar thats more modern -> https://material-ui.com/components/app-bar/ 
    - https://stackoverflow.com/questions/62058481/material-ui-appbar-changing-color-on-scroll-react
    - https://stackoverflow.com/questions/59510990/how-to-change-navbar-background-color-in-react-when-i-scroll

### 10.14.2020 - 7hr

Summary:
- [x] App.js should refer to homescreen
- [x] Hamburger needs to go to actial pages
- [x] Navbar changes color when scrolling

Also set up routing, context, and fonts. Tried to do something with StyledText s.t it grows and shrinks w/ window but not sure it works. Always check material-ui for shit it seems to have everything. 


Next
- [ ] Navbar pops when scrolling - from http://www.theaverygroupwinecountry.com
    - See https://material-ui.com/components/transitions/
    - See https://www.nearform.com/blog/animation-in-react/
    - See 'react-spring'
- [ ] Get weird effect where background stays same but everything else moves its from http://www.theaverygroupwinecountry.com
- [ ] Add social media link like -> http://www.pogofskygroup.com/
- [ ] Add the down arrow for more content like -> https://www.yourmyrtlebeachproperty.com
- [ ] On Navbar - drawer add some highlighting for page currently on,
    - [ ] The divider between name and logo is gone now figure out why. 
- [ ] Set up firebase including hosting s.t can share progress

# Firebase

**Adding Project**
firebase init

        
# Tips 
### Using Refs
- https://moduscreate.com/blog/everything-you-need-to-know-about-refs-in-react/

### Hamburger Nave
- https://material-ui.com/components/drawers/ (right drawer)
- https://ux.stackexchange.com/questions/99921/is-a-navigation-drawer-preferred-over-a-menu-when-menu-items-are-not-the-main-fu

### Base UI Drawings
Located at: https://docs.google.com/document/d/1tQxkmGdVtd0WJWubap895Yxl-sWgUddfJ4YApr9N-CM/edit?ts=5f82050e
(Have to logged into NU email to access)
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
