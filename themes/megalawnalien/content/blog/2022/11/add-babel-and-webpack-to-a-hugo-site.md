---
title: "Add Babel and Webpack to a Hugo Site"
description: "Add Babel and Webpack to your Hugo website with this step by step guide"
date: 2022-10-31
updated:  
image: "/images/blog/2022/"
images:
- "/images/blog/2022/"
categories:
- 
tags:
-
- 
- 
- 
- 
- 
draft: true
---


## Babel For Hugo

1. Make Sure NodeJS is installed
2. `npm init -y`
3. `npm install @babel/core @babel/cli --save-dev`
   1. This installs the core files for babel as well as the command line interface.  We save it to our dev dependencies which indicates that it is used in development but not in production. 
4. Install the Babel Presets
   1. `npm install @babel/preset-env --save-dev`
      1. This is the preset that allows us to use current javascript features that are not available in older browsers or maybe just not supported.
5. We need to create a `.babelrc` file to register the presets with babel

```
//  .baberc file 
//  tell babel which preset you are using
{
    "presets": ["@babel/preset-env"]
}

```

6. Now we can use the babel-cli to start doing stuff with Babel.  
7. `node_modules/.bin/babel path/to/script.js -o path/to/generated-script.js`
8. `mkdir dist && mkdir src`
9. `cd dist && mkdir assets`
10. `cd dist && touch bundle.js`
11. Inside src create an index.js file which you will write your javascript
12. add a script to package.json scripts property that looks a bit like this:

```
"babel": "node_modules/.bin/babel src/index.js --watch -o dist/assets/js/bundle.js"
```

Explanation:  we access the babel binary file, define the file we are transpiling, add a watch flag to ask babel to watch the file for changes, -o defines the output file which we pass in afterwards.


## Webpack For Hugo

- Create A Webpack Config File `webpack.config.js`

```
const path = require('path')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist/assets/js"),
        filename: "bundle.js"
    }
}

```

- Install webpack core and webpack cli as dev dependencies
- `node_modules/.bin/webpack` => this can be added to package.json `"webpack": "node_modules/.bin/webpack"`
- Now you will want to have your main javascript file that imports modules from other files. 


```
export {function1, function2, function3 }

```

## Default Export

`export default users`

`import whateverYouWantItToBefrom './dom'`

