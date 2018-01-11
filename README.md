# quickSearch
Bootstrap Quick Search

# Installation

Installation is easy, with minimal dependencies. Only Twitter Bootstrap's CSS and JS are required.

## Usage

Simply create a div with an id to be used by the plugin. Then call jquery function to create the control.

```js
$('#myDivId').quickSearch();
```

You could also add some options to you control.

```js
$('#myDivId').quickSearch({
    searchOptions:[{
        url: "http://google.com/search?q=",
        placeholder: "Web Search",
        type: "text",
        newWindow: false
    }]
});
```

### Parameters

These are the parameters required for the plugin:
- searchOptions: Array of the searchOption object
    - url: Url where the control will go after hitting Enter
    - placeholder: This will be the place holder for the input control
    - type: this will be the type for the input control
        - text/number
    - newWindow: determines if the control will launch a new window or not