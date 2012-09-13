// Brightness Filter
// By: Evan Lee
// Note: Range must be between -255 and 255
FILTER.Brightness=function(image)
{
	this.image=image;
};
FILTER.Brightness.prototype=new FILTER.Filter(); 
FILTER.Brightness.prototype.constructor=FILTER.Brightness; 
FILTER.Brightness.prototype.apply=function(amount) 
{
    var original = this.image.getPixelData();
    var height = original.height;
    var width = original.width;
    var dst = this.image.clone().getPixelData();
    
    for (var i=0; i<width*height*4; i=i+4){
            
            dst.data[i] += amount;
            dst.data[i+1] += amount;
            dst.data[i+2] += amount;
    }
    this.image.setPixelData(dst);
};
