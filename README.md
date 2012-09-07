# FILTER.js 

A Javascript Library for Image Processing and Filtering using HTML5 Canvas

This is a library for filtering images in javascript using canvas element.
It defines an Image class which represents and Image
and 4 basic filters 

* ColorMatrixFilter (analogous to the actionscript version)
* ConvolutionMatrixFilter (analogous to the actionscript version)
* DisplacementMapFilter (analogous to actionscript version)
* Image Blending Modes (analogous to Photoshop blends)

each basic filter is generic but it also includes basic filters
like grayscale, colorize, threshold, gauss, laplace, emboss, etc..
also a SobelFilter is defined which is a composite filter (composition of generic filters)

source code, minified version and build tools are included
also 2 examples are included a basic and an example with three.js

version 0.2

*Author* Nikos M.

*URL* http://nikos-web-development.netai.net/

*URL* http://workingclasscode.uphero.com/

# Using Filters, Functionally

I've added a little something to keep you from pulling your hair out
managing state across all your images: functional filters! Long live
functional composition!

@TODO: move funcitonal features into the right place (right now they're
just in `examples/filters.html`

with love from [Jake Teton-Landis](http://jake.teton-landis.org)

## Functional Filter Creation

You can easily make any filter into a function that returns a new image.
see `createFilterFunction`. You pass `createFilterFunction` a filter
class and (optionally) a function to apply to the new filter. This is
useful to call instance methods on the filter. For example, the edge
filter is created from the `FILTER.ConvolutionMatrixFilter` class by
applying the instance method `filter_instance.edge4()`. To create an
edge4 filter as a function:

    var edgeFilter = createFilterFunction(FILTER.ConvolutionMatrixFilter,
        function() { this.edge4(); });

## DOM Node Replacement

The only bother with producing images via functional composition is
getting your new, multi-filtered image back into the DOM, and then being
able to do that over and over. Luckily, I implemented a class to help
out here: the `DOMref`. DOMrefs hold a place in the DOM and let you
replace it over and over again.

    // a picture of che
    var im1 = new FILTER.Image('che.jpg');
    
    // create a DOMref with the original canvas element:
    var image_that_will_be_replaced = new DOMref(canvas_from_image(im1);
    
    // replace it with a edge-filtered version
    image_that_will_be_replaced.replace_with(canvas_from_image(
        edgeFilter(im1)));

Oh, `canvas_from_image(im1)` is just a function that returns a
HTMLCanvasElement from a FILTER.Image. It is interchangable with
`im1.canvasElement`, but I find it makes more sense in a
function-composition context.

*Have fun!*
