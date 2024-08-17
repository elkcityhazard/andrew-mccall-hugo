---
title: 'Importing Content From Hugo Into Wordpress'
date: 2024-08-16T21:18:22-04:00
author: Andrew M McCall
description:  This article walks through how I migrated Hugo data into Wordpress.
summary:  I walk through my philosophy on migrating Hugo data sources into wordpress as custom post types.
publishDate: 2024-08-16T21:18:22-04:00
updateDate:  2024-08-16T21:18:22-04:00
draft: false
categories:
  - Web Development
tags:
  - Hugo
  - Wordpress
  - Data Migration
---

## Why I Need To Import Hugo Data Sources Into Wordpress

Most poeple want to get away from Wordpress for something easier to manage.  However, I have a friend who wants to switch to Wordpress because of the experiences of their friends and family members who use it.

To be fair, Hugo wasn't exactly a great choice considering their technology skill level and demographic.  Markdown can be clunky to learn and very foreign if you have never utilized it.

I know it isn't difficult to learn, but not everyone wants to take the time.

My friend recently reached out to me and asked how they could update their site.  I was using forestry.io to update the markdown but that has since been replaced by tina.io.

I considered just having them send me over the content and implementing the changes myself.  But I don't want that to become a habit.  So we talked about it, and we are moving my friend to Wordpress.


## Planning To Migrate Data From Hugo To Wordpress

When I built the hugo site.  I utilized Hugo's `data` folder to store JSON files that make up the site content.  This is really convenient since everything is already in a structured data format.

The entries are basically a key:value pair that maps a little bit of meta data and most importantly a path to a static folder.

The first thing I did was just copy the static folder into a new wordpress installation so that wordpress can have access to it.

Next, was thinking about _how_ to import this data into Wordpress.

At a high level I need to consider the following items:

1. Create a custom post for the artwork
2. Create a custom taxonomy for the artwork categories
3. Register A New Advanced Custom Field group
4. Register an image size
5. Scan the directory that contains the json files and loop through them
6. Decode the files to php to do stuff with them
7. Extract the necessary data from the JSON
8. Create a new post to import into Wordpress
9. Dynamically generate attachments, and image sizes
10. Upload the images
11. Make sure we only import each photo once
12. Update any necessary meta data in the post.
13. Anything else?


## Creating A Post Type For The Artwork

Maybe I am just stubborn, but I decided to just use [must-use plugins](https://developer.wordpress.org/advanced-administration/plugins/mu-plugins/ "Must Use Plugins") for this.  If you don't know what `mu-plugins` are, they are essentially plugins that are loaded automatically with wordpress that live in their own custom `mu-plugins` folder.

Here is the code I used:

```
<?php

 if ( !function_exists('register_artwork_post_type') ):
    function register_artwork_post_type()
{

    $args = array(
        'label' => 'Artwork',
        'labels' => array(
            'name' => 'Artwork',
            'singular_name' => 'Artwork',
            'menu_name' => 'Artwork',
            'add_new' => "Add New Artwork",
            'set_featured_image' => 'Set Featured Artwork',

        ),
        'description' => "A New Piece For Artwork",
        'public' => true,
        'hierarchical' => false,
        'publicly_queryable' => true,
        'exclude_from_search' => false,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'menu_icon' => 'dashicons-art',
        'show_in_rest' => true,
        'capabilities' => array(
            'edit_artworks' => 'edit_artwork',
            'read_artworks' => 'read_artwork',
            'edit_artworks' => 'edit_artwork',
            'publish_artworks' => 'publish_artwork',


        ),
        'capability_type' => 'post',
        'map_meta_cap' => true,
        'supports' => array('title', 'author', 'comments', 'revisions', 'thumbnail', 'editor'),
        'has_archive' => true,
        'rewrite' => true,
        "taxonomies" => array('art_medium'),

    );

    register_post_type('artwork', $args);

}


add_action('init', 'artwork_register_artwork_post_type', 99);


 endif;
```

This is just a standard Wordpress function that registers a new post type.

Note, since we are going to eventually develop blocks for this theme, I have made sure to include `show_in_rest => true` so that we can see the post type with javascript.

Another consideration is that I associated the custom taxonomy right away with the post as seen at `taxonomies => array('art_medium)`.  This is so the custom taxonomy is available in the menu for the artwork post type.

## Registering A Custom Artwork Medium Taxonomy

Again, I chose to utilize `mu-plugins` to achieve this.  I needed this because the original artwork is divided up into categories.  I decided it was best to create a custom taxonomy and assign the original Hugo categories as terms on the custom taxonomy.

```
if (!function_exists('artwork_register_taxonomies')) :
    function artwork_register_taxonomies()
    {

        $taxonomy = 'art_medium';

        register_taxonomy(
            $taxonomy,
            'artwork',
            array(
                'label' => __('Art Category'),
                'rewrite' => array('slug' => 'medium'),
                'hierarchical' => true,
                'show_in_rest' => true,
            )
        );
    }


    add_action('init', 'artwork_register_taxonomies');


endif;
```
I am basically using this as a relational field to replaced the relational categories that exist in Hugo.

## Adding Advanced Custom Fields To The Artwork Post Type

I realize that ACF lets us create these within the admin GUI these days, but I still prefer to register ACF groups and fields on the server.  This is primarly because I like to create my own key names that are associated with the fields.  ACF relies and the uuid php package to generate randion keys for the fields and my brain doesn't wrap around this well.

```
<?php
// Register the fields
if( function_exists('acf_add_local_field_group') ):
    acf_add_local_field_group(array(
      'key' => 'artwork_group',
      'title' => 'Artwork',
      'fields' => array(

        array(
          'key' => 'artwork_title',
          'label' => 'Title',
          'name' => 'title',
          'type' => 'text',
        ),

        array(
          'key' => 'artwork_year',
          'label' => 'Year',
          'name' => 'Year',
          'type' => 'select',
        ),
        array(
          'key' => 'artwork_description',
          'label' => 'Description',
          'name' => 'description',
          'type' => 'textarea',
        ),

        // array(
        //   'key' => 'artwork_gallery',
        //   'label' => 'Gallery',
        //   'name' => 'gallery',
        //   'type' => 'gallery'
        // )

      ),
      'location' => array(
        array(
          array(
            'param' => 'post_type',
            'operator' => '==',
            'value' => 'artwork',
          ),
        ),
      ),
    ));

  endif;



  /**
   * year generator for acf year select field
   */

  function generate_year_array(int $min, int $max):array {

    $intArray = [];

    for ($i = $min; $i <= $max; $i++) {
      array_push($intArray, $i);
    }

    return array_reverse($intArray);

  }


  // dnyamically updates the select field for the art work year selector

  function load_years_in_select_field($field) {

    $field['choices'] = array();

    $years = generate_year_array(1979, (int)date('Y'));

    if ( is_array($years) ) :
        foreach ($years as $year) {
          $field['choices'][$year] = $year;
        }
    endif;

    return $field;
  }

  add_filter('acf/load_field/key=artwork_year', 'mf_load_years_in_select_field', 10);



  function register_mf_artwork_group() {

    register_rest_field('artwork', 'artwork_group', array(
      'get_callback' => 'get_artwork_api_field',
      'schema' => null,
    ));

  }

  add_action('rest_api_init', 'register_mf_artwork_group');



function get_artwork_api_field($post){

  $title = get_field('artwork_title', $post['id']);
  $year = get_field('artwork_year', $post['id']);
  $description = get_field('artwork_description', $post['id']);
  $gallery = get_field('artwork_gallery');

  return array(
    "title" => $title,
    "year" => $year,
    "description" => $description,
    "gallery" => $gallery
  );
}

```

The registration of the group and fields are pretty straight forward so lets walk through the customizations.

1. Generating a year select field - the original Hugo website displays the year the artwork was created in.  So there are two things that needed to happen.  I needed to create a factory function that can return a list of years from 1979 to the current year.  The second customization is that I utilized the advanced custom fields api to hook into the load_field by key and run a filter on the field.  This filter just loops through the result of the year factory function and dynamically creates a select field.
2. The additional item I needed to consider was making all of this acf data available to the REST API so I could develop blocks with it.  To do this, we just need to supply a callback to `rest_api_init`.  This callback registers a new REST API field, and supplies yet another callback that generates a response to the request.

## Registering Image Sizes

```
add_image_size('artwork-square', 500,500, false);
add_image_size('post-thumbnail', 968, 545, false);
```

These are needed to develop features on the frontend. I added them now so that when we generate the attachment metadata sizes, they will be ready to go.

## Walking Through The Hugo TO Wordress Importer Plugin

```
<?php

/***
 *  This is an import function to seed the data from the original static website
 *  uncomment add_action if you need to reimport
 *  something about the width causes an error in wordpress
 *  i used force regenerate thumbnails afterwards to fix
 */


namespace MaryFortuna;


use wp_upload_bits;

require_once(ABSPATH . 'wp-admin/includes/post.php');
require_once(ABSPATH . 'wp-admin/includes/image.php');
require_once(ABSPATH . 'wp-admin/includes/file.php');



/**
 * ImportStaticWebsite imports the artwork from Mary Fortuna's HTML Website
 */
final class ImportStaticWebsite
{

  private string $path_to_file;
  private array $files_to_parse;

  public function __construct(string $path_to_file, array $files_to_parse)
  {

    $this->path_to_file = $path_to_file;
    $this->files_to_parse = $files_to_parse;
    //add_action('wp_loaded', array($this, 'populate_art_from_json'), 99999);
  }


  private function process_collection(array $collection, $title, $term_id) {
    foreach ($collection as $artwork) {

      if (post_exists($artwork->title)):

        continue;

      endif;

      $year = $artwork->year ?? date('Y');

      $taxonomy = "art_medium";

      $term = get_term_by('id', intval($term_id), 'art_medium');

      $imageSrc = $artwork->src;


      $args = array(
        'post_title' => $artwork->title,
        'post_content' => sprintf("%s - %s", $title, $year),
        'post_status' => 'publish',
        'post_date' => date('Y-m-d H:i:s'),
        'post_author' => 1,
        'post_type' => 'artwork',
      );

      $post_id = wp_insert_post($args);

      if ($imageSrc) {
        $path_to_file = $this->path_to_file . $imageSrc;

        if (file_exists($path_to_file)) {
            // Check and prepare file type info
            $wp_filetype = wp_check_filetype($path_to_file, null);
            $attachment_data = array(
                'post_mime_type' => $wp_filetype['type'],
                'post_title'     => sanitize_file_name(pathinfo($path_to_file, PATHINFO_FILENAME)),
                'post_content'   => '',
                'post_status'    => 'inherit'
            );

            // Upload the file into the default uploads directory
            $upload_file = wp_upload_bits($imageSrc, null, file_get_contents($path_to_file));

            if(!$upload_file['error'] && file_exists($upload_file['file'])) {
                // Insert attachment into the Media Library
                $attach_id = wp_insert_attachment($attachment_data, $upload_file['file'], $post_id);

                // Generate attachment metadata and update
                $attach_data = wp_generate_attachment_metadata($attach_id, $upload_file['file']);
                wp_update_attachment_metadata($attach_id, $attach_data);

                // Set post thumbnail if required
                update_post_meta($post_id, '_thumbnail_id', $attach_id);

                // Resize images according to defined sizes in WordPress
                $image = wp_get_image_editor($upload_file['file']);
                if (!is_wp_error($image)) {
                    $sizes = wp_get_additional_image_sizes();

                    foreach ($sizes as $size => $size_data) {
                        $image->resize($size_data['width'], $size_data['height'], $size_data['crop']);
                        $filename = $image->generate_filename($size, null, 'jpg');
                        $image->save($filename);

                        // Add resized images to attachment metadata
                        $filepath = pathinfo($filename, PATHINFO_DIRNAME);
                        $fileurl = wp_upload_dir()['url'] . '/' . pathinfo($filename, PATHINFO_BASENAME);
                        $attachment_data = array(
                            'file' => $filename,
                            'sizes' => array(
                                $size => array(
                                    'file'      => pathinfo($filename, PATHINFO_BASENAME),
                                    'width'     => $size_data['width'] ?? 0,
                                    'height'    => $size_data['height'] ?? 0,
                                    'mime-type' => 'image/jpeg',
                                )
                            ),
                            'url' => $fileurl,
                            'type' => 'image/jpeg',
                            'mime-type' => 'image/jpeg'
                        );

                        wp_update_attachment_metadata($attach_id, $attachment_data);
                    }
                }
            }
        }
    }


      if (isset($post_id)):

        update_field('artwork_title', $artwork->title, $post_id);
        update_field('artwork_year', $artwork->year, $post_id);
        update_field('artwork_description', sprintf("%s - %s", $artwork->title, $artwork->year), $post_id);
        $taxonomy = "art_medium";

        $term = get_term_by('id', intval($term_id), 'art_medium');

        if ($term):

          // Insert post
          wp_set_object_terms($post_id, intval($term->term_id), $taxonomy, true);
        endif;
      endif;
    }

  }

  public function populate_art_from_json()
  {
    $dir = opendir($this->path_to_file . '/old-site');

    while (($file = readdir($dir)) !== false) {

      // Skip hidden files
      if ($file == '.' || $file == '..' || !in_array($file, $this->files_to_parse)) {
        continue;
      }

      $file_data = file_get_contents($this->path_to_file . '/old-site/' . $file);

      $json_data = json_decode($file_data);

      // high level data

      $title = $json_data->title;

      $term_id = $json_data->term_id;

      // process the collection

      $collection = $json_data->collection;

      $this->process_collection($collection, $title, $term_id);

    }

    // Close directory
    closedir($dir);
  }
}

$files_to_parse = array(
 'artwork.json'
);

new ImportStaticWebsite(get_theme_file_path('/static'), $files_to_parse);

```

### Scan The Directory & Get The JSON

The entry point of the function is `populate_art_from_json`. This is basically the main setup of the program:

1. We open a supplied directory for scanning.  `old-site` holds the json files that we need to process.
2. Next, we set up a while loop that is true while `readdir($dir)` is true.  From each iteration, we extract a `$file`.
3. Using `file_get_contents` we open the file for futher processing.  
4. Once we have the file opened, we decode the json so we can further process it with php.
5. We decalred the `$title`, `$term_id` and `$collection`  from the `$json_data`.
6. While the while loop is still open, we finish processing the file by passing this information into `process-collection`
7. After the while loop finishes, we simply close the directory.

### Processing the Collection - Sending the Hugo Data To Wordpress

`process_collection` is the main bread and butter of the importer.  It receives a collection, a title, and a term id, and creates a new post and new attachment in Wordpress from the Hugo data. 

1.  We use a foreach loop to loop through the collection
2. The first thing we do is to check if the post title exists already.  If it does, than we have already tried to upload this artwork and we bail out.  
3.  If the entry is elgible for creation, we start setting up the necessary data.
4.  We establish $year, $taxonomy, $term, and $imageSrc.  
5. __Note__: I prepopulated the terms in Wordpress.  Since the dataset was relatively small, I felt this was easier than trying to dynamically populate them.  This is represented in the function by `$term = get_term_by('id', intval($term_id), 'art_medium)`.  So this is just looking up the term by it's ID where it's parent taxonomy is 'art_medium.  

The next phase is actually starting to construct the post.

Utilizing `wp_insert_post` we can pass an array to insert a new post and it returns the inserted post_id.  This is a relatively easy process that is litereally just preparing executing a sql statement on our behalf.

So far so good.  

## Creating Image Variations From JSON For The Hugo Data Import To Wordpress

So far everything has been fairly straight forward.  I found the image portion of the import to be a little bit more messy.  But I think we can manage to walkthrough it and help us understand a little bit more about how Wordpress handles images so easily behind the scenes.  

```
  if ($imageSrc) {
        $path_to_file = $this->path_to_file . $imageSrc;
    
        if (file_exists($path_to_file)) {
            // Check and prepare file type info
            $wp_filetype = wp_check_filetype($path_to_file, null);
            $attachment_data = array(
                'post_mime_type' => $wp_filetype['type'],
                'post_title'     => sanitize_file_name(pathinfo($path_to_file, PATHINFO_FILENAME)),
                'post_content'   => '',
                'post_status'    => 'inherit'
            );
    
            // Upload the file into the default uploads directory
            $upload_file = wp_upload_bits($imageSrc, null, file_get_contents($path_to_file));
    
            if(!$upload_file['error'] && file_exists($upload_file['file'])) {
                // Insert attachment into the Media Library
                $attach_id = wp_insert_attachment($attachment_data, $upload_file['file'], $post_id);
    
                // Generate attachment metadata and update
                $attach_data = wp_generate_attachment_metadata($attach_id, $upload_file['file']);
                wp_update_attachment_metadata($attach_id, $attach_data);
    
                // Set post thumbnail if required
                update_post_meta($post_id, '_thumbnail_id', $attach_id);
    
                // Resize images according to defined sizes in WordPress
                $image = wp_get_image_editor($upload_file['file']);
                if (!is_wp_error($image)) {
                    $sizes = wp_get_additional_image_sizes();
    
                    foreach ($sizes as $size => $size_data) {
                        $image->resize($size_data['width'], $size_data['height'], $size_data['crop']);
                        $filename = $image->generate_filename($size, null, 'jpg');
                        $image->save($filename);
    
                        // Add resized images to attachment metadata
                        $filepath = pathinfo($filename, PATHINFO_DIRNAME);
                        $fileurl = wp_upload_dir()['url'] . '/' . pathinfo($filename, PATHINFO_BASENAME);
                        $attachment_data = array(
                            'file' => $filename,
                            'sizes' => array(
                                $size => array(
                                    'file'      => pathinfo($filename, PATHINFO_BASENAME),
                                    'width'     => $size_data['width'] ?? 0,
                                    'height'    => $size_data['height'] ?? 0,
                                    'mime-type' => 'image/jpeg',
                                )
                            ),
                            'url' => $fileurl,
                            'type' => 'image/jpeg',
                            'mime-type' => 'image/jpeg'
                        );
    
                        wp_update_attachment_metadata($attach_id, $attachment_data);
                    }
                }
            }
        }
    }
```

So what is going on here?  Lets break this down step by step:

1.  The first thing we are checking for is that an an image src has been assigned.  If there is no image src, we can just bail out.
2.  Next we are updating the file path so we know where to look for the file.  Note that the filepath assigned in the json matches the path in our `$path_to_file` directory.  So we are updating it to basically join the paths.  
3.  If the file exists, we can do some stuff with it
4.  The first thing to do is get the mimetype of the file.  We utilize `wp_check_filetype` to handle this.  
5.  Once we know the file type, we can begin construcing the attachment metadata.

```
            $attachment_data = array(
                'post_mime_type' => $wp_filetype['type'],
                    'post_title'     => sanitize_file_name(pathinfo($path_to_file, PATHINFO_FILENAME)),
                'post_content'   => '',
                'post_status'    => 'inherit'
            );

```

This gets sent along when we insert the attachment into Wordpress.  

6. Utilizing `wp_upload_bits`, we can upload the file into the default wordpress upload directory.  If there is an error, this function will return with a key labeled 'error'. 

7.  If there is no error, we can the rest of the process.  

8.  To insert the attachment into the database, so wordpress can associate the upload, we use Wordpress' built in function `wp_insert_attachement`.  This just creates a new attachment in Wordpress and associates the file with the media record.  
9.  Now that we have an attachment record, we generate the rest of the necessary metadata to complete our attachment upload.  
10.  We can used wp_generate_attachment_metadata to create the information needed for the image sizes.

From Wordpress:
> This function generates metadata for an image attachment. It also creates a thumbnail and other intermediate sizes of the image attachment based on the sizes defined on the Settings_Media_Screen.

Source: [Wordpress.org](https://developer.wordpress.org/reference/functions/wp_generate_attachment_metadata/ "Wordpress WP Generate Attachment Metadata")

11. After we generate the attachment metadata, we need to update the current attachment record accordingly and we use `wp_update_attachment_metadata` to handle that.

12.  We are also assinging a thumbnail via `update_post_meta($post_id, '_thumbnail_id', $attach_id)`;

So far, all we have really done is create the necessary metadata for the images.  THe next step is to actually generate the images.

This is all handled in the following function:

```
 // Resize images according to defined sizes in WordPress
                $image = wp_get_image_editor($upload_file['file']);
                if (!is_wp_error($image)) {
                    $sizes = wp_get_additional_image_sizes();
    
                    foreach ($sizes as $size => $size_data) {
                        $image->resize($size_data['width'], $size_data['height'], $size_data['crop']);
                        $filename = $image->generate_filename($size, null, 'jpg');
                        $image->save($filename);
    
                        // Add resized images to attachment metadata
                        $filepath = pathinfo($filename, PATHINFO_DIRNAME);
                        $fileurl = wp_upload_dir()['url'] . '/' . pathinfo($filename, PATHINFO_BASENAME);
                        $attachment_data = array(
                            'file' => $filename,
                            'sizes' => array(
                                $size => array(
                                    'file'      => pathinfo($filename, PATHINFO_BASENAME),
                                    'width'     => $size_data['width'] ?? 0,
                                    'height'    => $size_data['height'] ?? 0,
                                    'mime-type' => 'image/jpeg',
                                )
                            ),
                            'url' => $fileurl,
                            'type' => 'image/jpeg',
                            'mime-type' => 'image/jpeg'
                        );
    
                        wp_update_attachment_metadata($attach_id, $attachment_data);
                    }
```

13.  To generate the resized images, we create a new instance of `wp_get_image_editor` and pass in the uploaded file.  
14.  We check for any errors with initiating a new image editor instance and if there is none we can continue.
15.  Using `wp_get_additional_image_sizes()` we extract all of the data we need to generate the images.
16. We then loop through the image size data to generate the images. This is a 3 part process.  We resize the image, we generate the filename using Wordpress' built in filename shema for resized images, and then we save the file.
17.  The next step just repeats a process that we have already discussed.  We associate the resized image with the attachment in Wordpress and update the attachment metadata in wordpress.



### Final Thoughts On Migrating Hugo Data To Wordpress

Writing this out I see there are a few areas of opportunity I could probably improve on.  The image generation is definitely messy.  I think it could have all been bundled into one bit of logic but I lacked the understanding in the beginning to see that.  

Initially, I hooked into the wrong Wordpress hook and the taxonomies weren't being populated in time for the function to run.  That is why I moved it to the `wp_loaded` ook so there was enough time to fetch the tax and terms from the database.  

Also, noteably, I didn't do a very good job at sanitizing and checking for errors.  This is because I knew what the json data was like and had already spent time upfront organizing it.  

Either way, this was a func project to learn a bit about how Wordpress does things and even though I still don't really enjoy working with Wordpress, since 40% of websites use it, is good to have some familiarity.  
ca
