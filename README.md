# jql-backend

Server side code for the logger

## Testing the API

### Start the development instance

````shell
npm run dev
````

### Send the requests

You need to use something that will send requests, either use curl or something like Insomnia.

#### List all the events

````HTTP
GET /api/v1/events/
````

#### Get a single event

````HTTP
GET /api/v1/events/:id
````

#### Create an event

````HTTP
POST /api/v1/events/
````

With a body of"

````JSON
{
  "method": "<libraryName> <libraryMethod>",
  "protocol": "https",
  "hostname": "www.example.com",
  "path": "/dir/index.html",
  "href": "https://www.example.com/dir/index.html",
  "string": "<capturedString>",
  "debug": "<stackTrace>"
}
````

#### Update an event

````HTTP
PUT /api/v1/events/:id
````

With a body of (known safe is a boolean 0 or 1):

````JSON
{
  "knownSafe": 0
}
````

#### Delete an event

````HTTP
DELETE /api/v1/events/:id
````
