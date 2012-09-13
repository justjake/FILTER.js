// Contrast Filter
// By: Evan Lee
// Note: Contrast amount is between -255 and 255
FILTER.Contrast=function(image)
{
	this.image=image;
};
FILTER.Contrast.prototype=new FILTER.Filter(); 
FILTER.Contrast.prototype.constructor=FILTER.Contrast; 
FILTER.Contrast.prototype.apply=function(amount) 
{
    var original = this.image.getPixelData();
    var height = original.height;
    var width = original.width;
    var dst = this.image.clone().getPixelData();
    var desired = 259*(amount +255) / (255*(259 - amount));
    
    for (var i=0; i<width*height*4; i=i+4){
            var red = original.data[i];
            var blue = original.data[i+1];
            var green = original.data[i+2];
            
            dst.data[i] = (red-128)*desired + 128;
            dst.data[i+1] = (blue-128)*desired + 128;
            dst.data[i+2] = (green-128)*desired + 128;
    }
    this.image.setPixelData(dst);
};
