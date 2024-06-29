---
title: 'Golang Send Multipart Form Data to Api Endpoint'
date: 2024-06-27T20:29:08-04:00
author: Andrew M McCall
description: This is an example of using a multipart writer in golang to create a multipart form payload and send it to a json endpoint.
summary:  We often need to send data and files from one JSON API endpoint to another.  In this post, I explain how to use multipartform writer to send form data across api endpoint boundaries.
publishDate: 2024-06-27T20:29:08-04:00
updateDate:  2024-06-27T20:29:08-04:00
draft: false
categories:
  - Web Development
tags:
  - Go
  - Golang
  - Multipart Forms
  - JSON
  - API Development
---
**Code For This Post Can Be Viewed Here:** [github.com gist - elkcityhazard](https://gist.github.com/elkcityhazard/ac4342f395f1cf4639b5e58d0763ccc2#file-gistfile1-txt-L36 "An example of sending multipart form data to an api endpoint")


The case of receiving multpart form data as a post request is pretty straightforward in Golang.  Typically, you just `*http.Request.ParseMultipartForm, making sure to set an upper limit for the request Body size, and allocating the amount of memory needed to store the multipart form body request.  

But, what if you want to do some processing, and send it on to another api endpoint that accepts multipart form data?  I had this use case in my day job not too long ago and had to learn a little bit about the `mime/multipart Writer` type. In this post, we will explore how to send multipart form data using golang.  


## What Is A Multipart Form?

Multipart is a form data content type that allows submitting formws with binary files such as images and videos to a server application from the client, i.e., the browser.  In general terms, it splits the form data into multiple parts each with its own content-disposition header.   

> In a regular HTTP response, the Content-Disposition response header is a header indicating if the content is expected to be displayed inline in the browser, that is, as a Web page or as part of a Web page, or as an attachment, that is downloaded and saved locally.<br/><br/>
In a multipart/form-data body, the HTTP Content-Disposition general header is a header that must be used on each subpart of a multipart body to give information about the field it applies to. The subpart is delimited by the boundary defined in the Content-Type header. Used on the body itself, Content-Disposition has no effect.</br><br/>
The Content-Disposition header is defined in the larger context of MIME messages for email, but only a subset of the possible parameters apply to HTTP forms and POST requests. Only the value form-data, as well as the optional directive name and filename, can be used in the HTTP context.

Source: [Mozilla Developer Network Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition "Mozilla Web Documentation For Content-Disposition Header")

Multipart helps us add the necessary context or information to each subpart of the form body.  Each part can contain text fields, file uploads, and metadata about the file or field.  We typically define a multipart form in some html by making sure that the form element has the `enctype` set to "multipart/form-data".  On the server, the multipart form is parsed to excract the individual fields or files allowing them to exist in the same request.  An advantage to this method over URL-encoding the entire form is that it allows us to preserve the binary data and file structure, rather than encoding everything to text.  

## How To Handle A Multipart Form Request Body In Golang


To handle a multipart file upload, we of course need a server. 

Consider the following basic server:

```
func main() {
	srv := &http.Server{
		Addr:    ":8080",
		Handler: routes(),
	}

	fmt.Printf("listening on %s", srv.Addr)

	if err := srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func routes() http.Handler {
	routes := http.NewServeMux()

	routes.HandleFunc("/api/v1/upload", handleUpload)
	routes.HandleFunc("/api/v1/api-endpoint", receiveMultipartForm)
	return routes
}

```

This is about the most minimal example of a server in Goland using the standard library.  We are initializing a new pointer to an http.Server  and populating the Address and the Handler.  The Handler is just a function that returns an http.Handler.  

The `routes` function has a couple of http.Handlers with their corresponding paths.  

The process to recreate this is:

1. Create a pointer to an `http.Server` from the net/http package
2. Set the port you want the application to listen on.  In this case it is port ":8080"
3. Pass in an http.Handler to the Handler struct field.  In my case, I am using a separate function that returns a http.Handler. 
4. Make sure to populate the routes function to serve content on the routes.


## Setting Up The API Endpoint To Receive And Respond To The Multipart Form Request

At a high level we need to breakdown the parts to handle a multipart form request.  

1. We need to validate the requet method
2. We need to parse the form data
3. We need to process the request's multipartform file
4. We need to construct a payload to to respond with

```
func receiveMultipartForm(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		log.Fatalln(errors.New("invalid method"))
		return
	}

	err := r.ParseMultipartForm(32 << 10) // 32 MB
	if err != nil {
		log.Fatal(err)
	}

	name := r.FormValue("name")

	type uploadedFile struct {
		Size        int64  `json:"size"`
		ContentType string `json:"content_type"`
		Filename    string `json:"filename"`
		FileContent string `json:"file_content"`
	}

	var newFile uploadedFile

	for _, fheaders := range r.MultipartForm.File {

		for _, headers := range fheaders {

			file, err := headers.Open()

			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			defer file.Close()

			// detect contentType

			buff := make([]byte, 512)

			file.Read(buff)

			file.Seek(0, 0)

			contentType := http.DetectContentType(buff)

			newFile.ContentType = contentType

			// get file size

			var sizeBuff bytes.Buffer
			fileSize, err := sizeBuff.ReadFrom(file)

			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			file.Seek(0, 0)

			newFile.Size = fileSize

			newFile.Filename = headers.Filename

			contentBuf := bytes.NewBuffer(nil)

			if _, err := io.Copy(contentBuf, file); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			newFile.FileContent = contentBuf.String()

		}

	}
	data := make(map[string]interface{})

	data["form_field_value"] = name
	data["status"] = 200
	data["file_stats"] = newFile

	if err = json.NewEncoder(w).Encode(data); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

```

Validating the request method is really easy in golang.  The request always has that information and we just need to access the `r.Method` struct field and get the method out of the header information.  

In this case, we are are just exiting the function, but in the real world, we would construct an error message to return to the client. 

The next step is to actually parse the form data.  http.Request has a build in receiver function to handle this for us.  We simply call `r.ParseMultipartForm(32 << 10)`. This function takes in one argument which is the max memory and is of type int64.   

> ParseMultipartForm parses a request body as multipart/form-data. The whole request body is parsed and up to a total of maxMemory bytes of its file parts are stored in memory, with the remainder stored on disk in temporary files. ParseMultipartForm calls Request.ParseForm if necessary. If ParseForm returns an error, ParseMultipartForm returns it but also continues parsing the request body. After one call to ParseMultipartForm, subsequent calls have no effect. 

Source: [ParseMultipartForm Documentation](https://pkg.go.dev/net/http#Request.ParseMultipartForm "Golang Official net/http documentation")

If we take into consideration, we can parse basic text fields from the form like any other regular form.  In this case, we are calling `r.FormValue("name")` and storing it into a variable called name.  

That is easy enough, but what about binary files?  This is a little bit more complex, but at the end of the day, once we do it a few times, it becomes second nature.  The trick here is to range through each of the file headers of the `MultipartForm.File` slice.  

1. Set up the loop
2. use `Open` on the current header to open it
3. don't forget to defer closing it
4. Do some business logic
.5 Don't forget, that if you read it it all, you usually need to seek back to the beginning.
6. Construct the payload to send back to the client

## Handle Creating An HTTP Client And Sending Multipart Form Data

```
func handleUpload(w http.ResponseWriter, r *http.Request) {
	buf := &bytes.Buffer{}

	mpw := multipart.NewWriter(buf)

	// create a new field

	nameWriter, err := mpw.CreateFormField("name")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	_, err = nameWriter.Write([]byte("Omar"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// add a file

	f, err := os.Open("hello-world.txt")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	defer f.Close()

	fWriter, err := mpw.CreateFormFile("upload_file", "hello-world.txt")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	_, err = io.Copy(fWriter, f)

	if err != nil {
		log.Fatalln(err)
	}

	// Close the multipart writer before creating the request
	err = mpw.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// set up the request

	client := &http.Client{}

	req, err := http.NewRequest("POST", "http://localhost:8080/api/v1/api-endpoint", buf)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	req.Header.Add("Content-Type", mpw.FormDataContentType()) // detect the form data content type

	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	type uploadResponse struct {
		Status         int    `json:"status"`
		FormFieldValue string `json:"form_field_value"`
		FIleStats      any    `json:"file_stats"`
	}

	var ur uploadResponse

	if err = json.Unmarshal(body, &ur); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	if err = json.NewEncoder(w).Encode(ur); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
```

There are a few things we need to consider to be able to use golang to send multipart data.  

1. We need to create a `multipart.Writer` to be able to write the data.  
2. We also need to create an `http Client` to be able to send the data.
3. Handle the response. 

To create a multipart writer we call `multipart.NewWriter` and it accepts`bytes.Buffer` to write data to.  Creating a text field is straightForward: we call `CreateFormField` on the multipartWriter and give the field a name.  That gets stored in a variable, and we can call `Write` on that variable and pass it a slice of byte to write data to it.  

To add a file, it is a similar process, but slightly more complciated.  the `multipart writer` also has a receiver function called `CreateFormFile` and accepts two arguments, a field name, as well as the filename you want to pass in.  

In this example, we are opening a file called `hello-world.txt` and using ioCopy to copy the contents of the file into the `multipart.writer` form file field.  

Once we are all done adding stuff to the form, we can close the writer.  

The next step is to create a new `http.Client`.  This is relatively straightforward, but there are a few things to note:

1. The request body is going to be the buf that we wrote to with our multipart.writer
2. We need to add teh following Header to the requestion: `req.Header.Add("Content-Type", mpw.FormDataContentType())` to be able to populate the `Content-Disposition`
3. Initiate the request, and handle the response.  



