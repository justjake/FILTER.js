// Sharpen Filter
// By: Evan Lee
//input range: 0 to 1
FILTER.unsharp=function(image)
{
	this.image=image;
};
FILTER.unsharp.prototype=new FILTER.Filter(); 
FILTER.unsharp.prototype.constructor=FILTER.unsharp; 
FILTER.unsharp.prototype.apply=function(percent) 
{
    var original = this.image.getPixelData();
    var height = original.height;
    var width = original.width;
    var dst = this.image.clone().getPixelData();
    new FILTER.ConvolutionMatrixFilter(this.image).sharpen().apply();
    var sharp = this.image.getPixelData();
    var xstart = 0;
    var xend = width;
    
    
    //create output image
    for (var i=0; i<height*width*4; i=i+4){
        dst.data[i] = percent*sharp.data[i] + (1-percent)*original.data[i];
        dst.data[i+1] = percent*sharp.data[i+1] + (1-percent)*original.data[i+1];
        dst.data[i+2] = percent*sharp.data[i+2] + (1-percent)*original.data[i+2];
    }

    this.image.setPixelData(dst);
};
