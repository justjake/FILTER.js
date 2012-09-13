// Quantization  Filter
// By: Evan Lee
FILTER.Quantize=function(image)
{
	this.image=image;
};
FILTER.Quantize.prototype=new FILTER.Filter(); 
FILTER.Quantize.prototype.constructor=FILTER.Quantize; 
FILTER.Quantize.prototype.apply=function(levels) 
{
	var original = this.image.getPixelData();
    var dst = this.image.clone().getPixelData();
    var width = original.width;
    var height = original.height;
	new FILTER.ColorMatrixFilter(this.image).grayscale().apply();
    var gray = this.image.getPixelData();
    
    for (var i=0; i<width*height*4; i++){
            pixel = gray.data[i];
            pixel = Math.floor(pixel/(256/levels)) * (256/levels)*1.5;
            dst.data[i] = pixel
            dst.data[i+1] = pixel
            dst.data[i+2] = pixel
    }
  this.image.setPixelData(dst);          
    
};