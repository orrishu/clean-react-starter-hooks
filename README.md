# clean-react-starter-hooks
a clean starter for react application, with router, translations, css-modules and api connection.
built upon https://github.com/orrishu/clean-react-starter with hooks and function components instead of classes

using webpack-dev server for development with hot-reloading enabled.

## updated 03/03/2021 for versions:
react 17.0.1;  
react-router 5.2.0;  
~~babel-plugin-react-css-modules~~  
changed babel-plugin-react-css-modules to **@dr.pogodin/babel-plugin-react-css-modules**, version 6.0.10.  
this is due to webpack 5 upgrade that caused problems with the hash of cssmodules:   
css-loader hash was different than the one created by babel-plugin-react-css-modules.  
(babel-plugin-react-css-modules => converts styleName to class with module namespaces;   
css-loader creates the css file.)  

### upgraded to webpack 5 (5.24.2, 03/03/2021)
I suffered some unpleasant issues with cssmodules.  
see above for @dr.pogodin plugin that fixed the issue.

### removed @babel/polyfill (03/03/2021)
I used it for IE11 support. Can be added if needed.

prerequisites
------------
node >= 12.6.0 (currently running on node 14.4.0)

development
-----------
```
npm i
npm start
```

production
----------
```
npm i
npm run rebuild
```

Then copy files created in `./dist` folder to your server.

