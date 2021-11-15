# clean-react-starter-hooks
a clean starter for react application, with router, translations, css-modules and api connection.
built upon https://github.com/orrishu/clean-react-starter with hooks and function components instead of classes

using webpack-dev server for development with hot-reloading enabled.

## updated 15/11/2021 for versions:
react 17.0.2;  
react-router 6.0.2;  
~~babel-plugin-react-css-modules~~  
changed babel-plugin-react-css-modules to **[@dr.pogodin/babel-plugin-react-css-modules](https://github.com/birdofpreyru/babel-plugin-react-css-modules)**, version 6.0.10.  
this is due to webpack 5 upgrade that caused problems with the hash of cssmodules:   
css-loader hash was different than the one created by babel-plugin-react-css-modules.  
(babel-plugin-react-css-modules => converts styleName to class with module namespaces;   
css-loader creates the css file.)  

### upgraded to webpack 5 (~~5.35.0, 10/06/2021~~ 5.64.0 15/11/2021)
I suffered some unpleasant issues with cssmodules.  
see above for @dr.pogodin plugin that fixed the issue.

### removed @babel/polyfill (03/03/2021)
I used it for IE11 support. Can be added if needed.

### notes about css:
On dev mode, style-loader can replace MiniCssExtractPlugin to allow style tags in head, instead of css file.  
**Important:** css-loader version must match @dr.pogodin/babel-plugin-react-css-modules fork.  
It is possible that after npm install or npm update, need to update to @latest both packages so css will work.  

prerequisites
------------
node >= 12.6.0 (currently running on node 16.13.0)

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

