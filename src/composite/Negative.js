// Negative Filter
// By: Evan Lee
FILTER.Negative=function(image)
{
	this.image=image;
};
FILTER.Negative.prototype=new FILTER.Filter(); 
FILTER.Negative.prototype.constructor=FILTER.Negative; 
FILTER.Negative.prototype.apply=function() 
{
    var original = this.image.getPixelData();
    var height = original.height;
    var width = original.width;
    var dst = this.image.clone().getPixelData();
    
    for (var i=0; i<width*height*4; i=i+4){
            dst.data[i] = 255 - original.data[i];
            dst.data[i+1] = 255 - original.data[i+1];
            dst.data[i+2] = 255 - original.data[i+2];

    }
    this.image.setPixelData(dst);
};
