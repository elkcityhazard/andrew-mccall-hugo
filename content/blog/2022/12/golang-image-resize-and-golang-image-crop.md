---
title: "Golang Image Resize and Golang Image Crop: Image Manipulation With Go Programming Language"
author: Andrew M McCall
description: "Go has native support via the Image package to resize and crop images.  Keep your application light by doing your own image resizing and cropping"
summary: An introduction to some of the very basic features of iamge cropping with Go.  
date:  2022-12-18T00:00:00
updated:  2022-12-18T00:00:00
image: "/blog/2022/12/working-with-images-with-golang-1600x900.jpeg"
images:
- "/blog/2022/12/working-with-images-with-golang-1600x900.jpeg"
categories:
- Web Development
tags:
- Go
- Golang
- Image Processing
- Web Development
- Server Programming
- Mime-type Detection
- 
draft: false
---

# Golang Image Resize & Golang Image Crop

In general, I believe most people will want to use a dedicated package to really make this powerful but I wanted to write a bit about my experience with resizing images in Golang.  

Before I go any further, here are a few resources I used to learn more about image processing for my own purposes.  

[How to Crop image in Golang?](https://ahmadrosid.com/blog/golang-img-crop "How To Crop Images In Golang")
[https://stackoverflow.com/questions/22940724/go-resizing-images](https://stackoverflow.com/questions/22940724/go-resizing-images "Go: Resizing Images")
[Go Image Package](https://pkg.go.dev/image "Go Image Package: Standard Library")
[Go Image/Draw Package](https://pkg.go.dev/image/draw "Go Draw Package: Standard Library")

## Psuedo Code For Image Resizing and Cropping With Go

Before we actually start writing the code, lets explain the process and all of the steps that we will need to take to accomplish resizing and cropping images in Go.  

1. Open a previously saved image file and decode it as an image.
2. Defer closing the open file until we are done with it
3. Do we care about what kind of image it is?  If so we will need to handle checking the image type.
4. create an new "output" file to save the manipulated image with and we can't forget deferring the file close on this as well
5. Did we check what kind of file it is?  We will need to seek back to the beginning of the input file so we can save the whole thing! 
6. Create a brand new image  based on some parameters we get from the src image
7. To crop the image we are going to need to get some parameters such as the image bounds, x length, y length, etc.  
8. To crop the image, we are going to need to use `image.Rect` to define a new image canvas
9. We are going to need to figure out some focal points for the cropped image so we can crop it into the position we want to
10.  Pull the part of the input image into the new cropped image (using type casting and SubImage)
11. Do we need to save the cropped image separately?  
12. Do we need to save the a resized version of the image?   


## Reading the file into memory

```
package main

import (
	"os"
	"log"
	"net/http"
			 )

func main() {

file, err := os.Open("path/to/fileWeWantToWorkWith.png")

if err != nil {
log.Fatalln(err)
}

defer file.Close()

}
```

1. The first step is simple enough.  All we need to do is import the `OS` standard package and call it's receiver function `Open`.  This returns two things, the file, or the error.  If there is an error, for example, if the file does not exist, all we are doing is importing the log package to log out the error.  Finally, whenever we are opening a file, we will want to defer closing the file.  What `defer` means is we are essentially evaluating the function, but not closing the file until a near by function returns.  In this case, the file closes when the main function returns or exits.
2. This part may be extra, so I am leaving a notice here to dwell on this.  Do we need to verify the image type before we do any further processing.  Let's write the code out and then talk about it.
```
//	create a buffer to read the image into 
imageBuffer := make([]byte, 512)

// read the image into the imageBuffer

_, err := file.Read(imageBuffer)

if err != nil {
log.Fatalln(err)
}

// get the file type from the buffer

fileType := http.DetectContentType(imageBuff)

_, err := file.Seek(0,0)

if err != nil {
log.Fatalln(err)
}
output, _ := os.Create(path.Join("./some-resized-from-original-file.png/"))

// defer closing the output file until we are done writing it and the function exits (avoid memory leak)

defer output.Close()

```
The process here is 4 steps:
1. we create a buffer to read the image into.  All this is is a slice of bytes with the length of 512 bytes.  
2. `OS` package comes with a receiver method called `Read`.  We are reading the contents of the file and passing it into the image buffer.  Since the image buffer is 512 bytes we are getting the first 512 bytes of the file (which we need to determine the mimetype of the file. 
3. Using `net/http` we are calling `http.DetectContentType` and passing the image into it.   This receiver method accepts a slice of bytes and returns a string which is the mime-type of the file.
4. Since we partially read the file, we need to `Seek` to the beginning.  This is because the file is currently read to 512 bytes.  Because of this, any operation such as saving the file will not include the first 512 bytes.  To fix this, all we need to do is call `file.Seek(0,0)` which will return the file to the beginning.  

## Create A New Image Using Go Standard Library Package

5. At this point, we should be able to theoretically determine the file type and decode the image.  One of the reasons we might want to determine the file type is, in the event that the file is say a `wav` file, we can return and exit from the function (no reason to continue) .  Again, this is a part that may not be necessary but it is how I did it.  I feel that as long as we import `image/jpeg` and `image/png` we should be able to use `Image.Decode()` to decode the image into memory.   That being said, I did not set it up this way.   I just made a simple check to see which type of image we have:
```
// create a new image variable

var src image.Image

// determine if the original file was a png or jpeg before continuing

if strings.EqualFold(fileType, "image/png") {
src, _ = png.Decode(input)
} else {

// Decode the image (from PNG to image.Image):
src, _ = jpeg.Decode(input)
}
```
Besides using the built in Decode functions, the only thing to note here is that we are using the strings package to determine if the filetype is equal to the mime type provided.  `strings.EqualFold` is essentially just checking to make sure two strings are exactly the same.  

## Cropping The Image 

6. Set up the destination image using Go's Image package.  There will be a few things going on here so let's get the code written and explore what is going on:
```
// create a whole new sized image

// Set the expected size that you want:
destinationImage := image.NewRGBA(image.Rect(0, 0, src.Bounds().Max.X/4, src.Bounds().Max.Y/4))

  

// At returns the color of the pixel at (x, y).
// At(Bounds().Min.X, Bounds().Min.Y) returns the upper-left pixel of the grid.
// At(Bounds().Max.X-1, Bounds().Max.Y-1) returns the lower-right one.

bounds := destinationImage.Bounds()

// Get Width
width := bounds.Dx()
height := bounds.Dy()

// created the cropped size of the image

croppedImage := image.Rect(0, 0, width/2, width/2)

// dynamically get focal point based on original width

focalX := math.Floor(float64(width)) * 1.33
focalY := math.Floor(float64(height)) * 1

//This is the place of the left and top padding of image that you want to crop. In this case we add padding left to 100 pixels and padding top of 80 pixel

croppedImage = croppedImage.Add(image.Point{int(focalX), int(focalY)})

//SubImage returns an image representing the portion of the image p visible through r. The returned value shares pixels with the original image.

croppedImage := src.(SubImager).SubImage(croppedImage)

// This takes care of the cropped image 

croppedImageFile, err := os.Create("./cropped.png")

if err !=  nil {
log.Fatalln(err)
}

defer croppedImageFile.Close()

if err := png.Encode(croppedImageFile, croppedImage); err !=  nil {
log.Fatalln(err)
}

// Resize - create a resized version of the original:
draw.NearestNeighbor.Scale(destinationImage, destinationImage.Rect, src, src.Bounds(), draw.Over, nil)
// Encode to `output`:
if strings.EqualFold(fileType, "image/png") {
png.Encode(output, dst)
} else {
jpeg.Encode(output, dst, nil)
}
```

At the top of the code block, the first thing we are doing is defining a new image using Go's built-in image package.  `image.NewRGBA` defines a new image which takes `x1, y1, x2, y2` type coordinates to define the rectangle the 2D image is going to be.  I am getting the source image's max x and y bounds and dividing the dimensions by 4 here to create a smaller image.  

I am also pulling out the dimensions  by setting bounds as its own variable and getting the height and width parameters from it.  These will be used to crop the image as well as set the focal points for the cropped image.  

Next, we need to create a variable to hold our new cropped Image.  This is done by defining `cropped Image := Image.Rect(0, 0, width/2, height/2)`

From the standard library:
> Rect is shorthand for Rectangle{Pt(x0, y0), Pt(x1, y1)}. The returned rectangle has minimum and maximum coordinates swapped if necessary so that it is well-formed.

What we are doing here is looking at the height and width of the file we are working to crop, and generating a new image that is half the size.  In the case of my source image, I already resized it at `destinationImage` by a factor of 4.  Now, I am creating a new `croppedImage` from the destination image that is half that size.  So, if my original image had a width of 800, the `destinationImage` would now have a width of 200.  Since I am reducing the size of the cropped image even smaller,  `croppedImage` will have a width of 100px.  


The next step is to establish the focal points for the cropped image.  If you can recall earlier, we extracted the `height` and `width` from the `destinationImage` Bounds method.  These are accessed via `bounds.Dx() bounds.Dy()` respectively.  Here is a pain point to this process.  I think it would be best to construct a graphic utility to set this.  That is beyond the scope of this tutorial, however.  Since we don't know the actual size of the images I worked to create sensible defaults here.:

```
//This is the place of the left and top padding of image that you want to crop. In this case we add padding left to width * 1.33 and padding top is the height of the destination image
focalX := math.Floor(float64(width)) * 1.33
focalY := math.Floor(float64(height)) * 1
```

This establishes which section of the image to be cropped we are going to be taking the sub image of.  

To continue on, we now need to add these coordinates to the actual cropped Image so we can extract that section as a sub image. 

`cropSize = cropSize.Add(image.Point{int(focalX), int(focalY)})`

focalX and focalY need to be cast to int because we used math.Floor to make sure they are a nice even number to work with.  

Next, we are going to use type casting to get the SubImage of the original source image.  and cast it to the new `cropSize` image that we created.  Since we defined the section that we are taking in the via `cropSize` all we need to do is direct the SubImage from the original source image to the `cropSize` image.  

From the SubImage documentation:
> SubImage returns an image representing the portion of the image p visible through r. The returned value shares pixels with the original image.

Finally, if all goes well, we cam save the image like so:

```
// Create a new file
croppedImageFile, err := os.Create("./static/uploads/cropped.png")  
// handle the error if there is any
if err != nil {  
   log.Fatalln(err)  
}  
 // defer closing the file 
defer croppedImageFile.Close()  
 // Encode the croppedImage to the croppedImage file thus saving it.   
if err := png.Encode(croppedImageFile, croppedImage); err != nil {  
   log.Fatalln(err)  
   return err  
}
```


This is pretty much a repeat of what we have already seen in regards to creating a file.  

## Use Nearest Neighbor To Save the resized image

Finally, the last step is we are going to save the resized version of the src image using the quickest (but not the most accurate method) which is Nearest Neighbor
```
// Resize:  
draw.NearestNeighbor.Scale(destinationImage, destinationImage.Rect, src, src.Bounds(), draw.Over, nil)  
  
// Encode to `output`:  
  
if strings.EqualFold(fileType, "image/png") {  
   png.Encode(output, dst)  
} else {  
   jpeg.Encode(output, dst, nil)  
}
```



The Complete Function Here:

```
package main
  
import (  
   "fmt"  
   "image" 
   "image/jpeg" 
   "image/png" 
   "log" 
	 "math" 
	 "net/http" 
	 "os" 
	 "strings"  
 "golang.org/x/image/draw"
 )  
  
// SubImager type is created to use type assertion to cast SubImage to the image  
  
type SubImager interface {  
   SubImage(r image.Rectangle) image.Image  
}  
  
func main(){  
  
   // Open up the damn file  
  input, _ := os.Open(pathToFile) 
   
   // don't forget to defer closing it to avoid memory leak  
  defer input.Close()  
  
   // create a new image buffer  
  
  imageBuff := make([]byte, 512)  
  
   // read the original file into the image buffer so we can check what type of file it is  
  
  _, err := input.Read(imageBuff)  
  
   if err != nil {  
      return err  
   }  
  
   // get the file type from the buffer  
  
  fileType := http.DetectContentType(imageBuff)  
  
   // create the output file  
  
  output, _ := os.Create("/path-to-save-image.png")  
  
   // defer closing the output file until we are done writing it and the function exits (avoid memory leak)  
  defer output.Close()  
  
   // seek the file back to the beginning or else we won't be able to write the whole file  
  
  input.Seek(0, 0)  
  
   // create a new image variable  
  
  var src image.Image  
  
  // determine if the original file was a png or jpeg before continuing  
  
  if strings.EqualFold(fileType, "image/png") {  
      src, _ = png.Decode(input)  
   } else {  
      // Decode the image (from PNG to image.Image):  
  src, _ = jpeg.Decode(input)  
   }  
  
  // create a whole new sized image  
  
 // Set the expected size that you want:  
 destinationImage := image.NewRGBA(image.Rect(0, 0, src.Bounds().Max.X/4, src.Bounds().Max.Y/4))  
  
  // At returns the color of the pixel at (x, y).  
 // At(Bounds().Min.X, Bounds().Min.Y) returns the upper-left pixel of the grid. 
 // At(Bounds().Max.X-1, Bounds().Max.Y-1) returns the lower-right one.  
  
  bounds := destinationImage.Bounds()  
  
  // Get Width  
  
  width := bounds.Dx() 

// Get Height 
  
   height := bounds.Dy()  
  
   // created the cropped size of the image  
  
  croppedImageSized := image.Rect(0, 0, width/2, height/2)  
  
   // dynamically get focal point based on original width  
  
  focalX := math.Floor(float64(width)) * 1.33  
  focalY := math.Floor(float64(height))  
   //focalY = 0  
 //focalX = float64(width)  
 //This is the place of the left and top padding of image that you want to crop. In this case we add padding left to width * 1.33 and padding top is the height of the destination image  
  croppedImageSized = croppedImageSized.Add(image.Point{int(focalX), int(focalY)})  
  
   // SubImage returns an image representing the portion of the image p visible 
   //	through r. The returned value shares pixels with the original image.  
  
  croppedImage := src.(SubImager).SubImage(croppedImageSized)  
  
   croppedImageFile, err := os.Create("./static/uploads/cropped.png")  
  
   if err != nil {  
      log.Fatalln(err)  
   }  
  
   defer croppedImageFile.Close()  
  
   if err := png.Encode(croppedImageFile, croppedImage); err != nil {  
      log.Fatalln(err)  
      return err  
  }  
  
   // Resize:  
  draw.NearestNeighbor.Scale(destinationImage, destinationImage.Rect, src, src.Bounds(), draw.Over, nil)  
  
   // Encode to `output`:  
  
  if strings.EqualFold(fileType, "image/png") {  
      png.Encode(output, destinationImage)  
   } else {  
      jpeg.Encode(output, destinationImage, nil)  
   }  
  
   return nil  
}
```

The main TODO here is figuring out a way to dynamically choose the SubImage since we are just hard coding the values.  Beyond that, this is pretty much a straight forward way to resize images in a Go application that doesn't require an additional third-party library.

If you still have questions, feel free to contact me here on my website, @elkcityhazard on twitter, or @elkcityhazard@indieweb.social on mastodon.

Read More Golang Articles by me here:

[How To Read Environment Variables From A File For Your Go Application](/blog/2022/09/golang-read-environment-variables-from-file/ "Working with Environment Variables In Go")

[How To Create A Template Cache For A Go Application](/blog/2022/06/create-a-template-cache-for-a-go-application/ "How To Create A Template Cache For Your Next Golang Application")












