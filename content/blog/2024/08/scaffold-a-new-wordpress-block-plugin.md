---
title: 'Scaffold a New Wordpress Block Plugin'
date: 2024-08-03T11:38:18-04:00
author: Andrew M McCall
description: Notes on creating a new block plugin for your Wordpress Block / Fullsite Editing Theme
summary:  Since I always forget, here are some notes on scaffolding a new block plugin for Wordpress themes
publishDate: 2024-08-03T11:38:18-04:00
updateDate:  2024-08-03T11:38:18-04:00
draft: true
categories:
  - Web Development
tags:
  - Wordpress
  - Full Site Editing
  - Block Themes
  - Plugin Development
---

1. Inside of plugin directory: `npx @wordpress/create-block block-plugin-name --variant=dynamic`
2. in `src` create a new folder named blocks.  Each sub folder will be a unique block.  For example, `footer`, `header`. 'unique-widget`
3. From the official wordpress scaffolding, each block needs to have the following files:
    - block.json
    - edit.js
    - editor.scss
    - index.js
    - render.php
    - style.css
    - view.js
4. in the block-plugin.php file (block entry point for plugin) you need to also update the `register_block_type` function to look for the blocks in their respective folders in the `register_block_type(__DIR__ . '/build/blocks/my-block-folder')`
5.  A boilerplate to init the plugin can look something like this:
```
namespace MyBlockNamespace

if (!defined('ABSPATH)):
    exit;
    endif;

final class MyBlockClass{
    static function init() {
            add_action('init', function(){
                    register_block_type(__DIR__ . '/build/blocks/myblock');

                })
        }
    }

    MFBlocks::init();
```

Then in any other files in the plugin, you can access methods like this: `MyBlockNamespace\MyBlockClass::my_static_method();`

This will help avoid any namespace collisions or function overrides.  Note I am using final to ensure the class doesn't get overwritten.

## Random Notes On Creating Blocks

### How To Fetch Data in the Edit Screen

The edit screen uses custom React hooks to fetch data.  Here is an example of one such method to fetch some pages.

```
import {useSelect} from '@wordpress/data'
import {store as coreDataStore} from '@wordpress/core-data'

const pages = useSelect(select => select(coreDataStore).getEntityRecords('postType', 'page', {per_page: 20}), [])

console.log(pages)
```

### Import Metadata into blocks

Need something like your text domain?  metadata is your friend

`import metadatafrom './blocks.json'`

`<PanelBody title={__('My Panel Body', metadata.textdomain)}></PanelBody>`

### Inspector Controls

`import {InspectorControls} from '@wordpress/block-editor'`
`import {PanelBody} fom '@wordpress/components'`

Create a new inspector control for the block by using as a regular react component.

`<InspectorControls><PanelBody title="Panel Body Title">Test Message</PanelBody></InspectorControl>`


### Block Attributes

These are initialized in `blocks.json`.

this is in the the "attributes" property.

To access block attributes in block, we need to extract them from props.

For example, in the edit function, we can pass props, or destructure them like:

```
export default function Edit({attributes,setAttributes}) {
        console.log(attributes)
        return (
            // component return...
        )
    }
```


We can get our saved props from `props.attributes.myKey` and we can also update them using built in methods one like `onChange={valToUpdate => setAttributes({myKey: valToUpdate})}`

Then we can set the value to whatever `props.attributes.key` is.




## Developing Blocks Inside Your Theme

1.  At the base of your theme, you need to install `npm install --save-dev @wordpress/scripts`
2. I like to create a `src`, `build`, and `blocks` folder.
3. edit the `package.json scripts` such that `"start": "wp-scripts start src/**/* blocks/**/*"` to capture additional files.
4. Boilerplate to register a block with JS:
```
wp.blocks.registerBlockType("primary-blocks/banner", {
    title: "Banner",
    edit: EditComponent,
    save: SaveComponent,
});

function EditComponent() {
    return (
        <header>Hello World</header>
    )
}

function SaveComponent(){
    return <p>This is From Our Block</p>
}
```

5. Boilerplate to register blocks with php:
```
class JSXBlockRegisterHelper {
    public $name;
    public $folder_path;

    function __construct($name) {
        $this->name = $name;
        add_action('init', [$this, 'onInit']);
    }

    function onInit() {
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js");
        register_block_type("primary-blocks/{$this->name}", array(
            'editor_script' => $this->name,
        ) );
    }
}


/**
 * Register New Blocks
 */
new JSXBlockRegisterHelper("banner");
```

6.  __Notes:__ This assumes you are just dumping everything into the build folder, so you want to make sure you are enqueueing from the build folder and not the src folder since that won't be found.
7. Very similar to how we are doing it with a plugin.
