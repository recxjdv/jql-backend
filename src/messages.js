const messages = {};

// Text taken from: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
messages.error = {
  404: '<h1>404 Not Found</h1><br><p>The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurrence on the web.</p>'
};

module.exports = messages;
