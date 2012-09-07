// Sobel  Filter
FILTER.Sobel=function(image)
{
	this.image=image;
};
FILTER.Sobel.prototype=new FILTER.Filter(); 
FILTER.Sobel.prototype.constructor=FILTER.Sobel; 
FILTER.Sobel.prototype.apply=function() 
{
	var original = this.image.getPixelData();
	// vertical gradient
	new FILTER.ConvolutionMatrixFilter(this.image).sobel1().apply();
	console.log("filt1");
	var vertical = this.image.getPixelData();
	// restore
	this.image.setPixelData(original);
	// horizontal gradient
	new FILTER.ConvolutionMatrixFilter(this.image).sobel2().apply();
	var horizontal = this.image.getPixelData();
    console.log("filt2")
	var dst=[];
	for (var i=0; i<original.data.length; i+=4) {
        // calculate new pixel data
        var vred = Math.abs(vertical.data[i]);
        var hred = Math.abs(horizontal.data[i]);
        dst[i] = Math.abs(vred) + Math.abs(hred);
        var vgreen = Math.abs(vertical.data[i+1]);
        var hgreen = Math.abs(horizontal.data[i+1]);
        dst[i+1] = Math.abs(vgreen) + Math.abs(hgreen);
        var vblue = Math.abs(vertical.data[i+2]);
        var hblue = Math.abs(horizontal.data[i+2]);
        dst[i+2] = Math.abs(vblue) + Math.abs(hblue);
        dst[i+3] = 255; // opaque alpha
	}
	var data = this.image.getPixelData();
	for (var i=0;i<data.data.length;i++)
        data.data[i]=dst[i];
    this.image.setPixelData(data,0,0);
};
/*{
	// grayscale
	new FILTER.ColorMatrixFilter(this.image).grayscale().apply();
    console.log("gray");
	var grayscale = this.image.getPixelData();
	// vertical gradient
	new FILTER.ConvolutionMatrixFilter(this.image).sobel1().apply();
	console.log("filt1");
	var vertical = this.image.getPixelData();
	// restore
	this.image.setPixelData(grayscale);
	// horizontal gradient
	new FILTER.ConvolutionMatrixFilter(this.image).sobel2().apply();
	var horizontal = this.image.getPixelData();
    console.log("filt2")
	var dst=[];
	for (var i=0; i<grayscale.data.length; i+=4) {
	  // make the vertical gradient red
	  var v = Math.abs(vertical.data[i]);
	  dst[i] = v;
	  // make the horizontal gradient green
	  var h = Math.abs(horizontal.data[i]);
	  dst[i+1] = h;
	  // and mix in some blue for aesthetics
	  dst[i+2] = (v+h)/4;
	  dst[i+3] = 255; // opaque alpha
	}
	var data = this.image.getPixelData();
	for (var i=0;i<data.data.length;i++)
	data.data[i]=dst[i];
  this.image.setPixelData(data,0,0);
};*/
