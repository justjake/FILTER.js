// Sepia Filter
// By: Evan Lee
// Note: Input amount ranges from 0 to 1
FILTER.Sepia=function(image)
{
	this.image=image;
};
FILTER.Sepia.prototype=new FILTER.Filter(); 
FILTER.Sepia.prototype.constructor=FILTER.Sepia; 
FILTER.Sepia.prototype.apply=function(amount) 
{
    var original = this.image.getPixelData();
    var height = original.height;
    var width = original.width;
    var dst = this.image.clone().getPixelData();
    
    for (var i=0; i<width*height*4; i=i+4){
        var r = original.data[i];
        var g = original.data[i+1];
        var b = original.data[i+2];
        
        var outr = amount*((r*0.393) + (g*0.769) + (b*0.189)) + (1-amount)*r;
        var outg = amount*((r*0.349) + (g*0.686) + (b*0.168)) + (1-amount)*g;
        var outb = amount*((r*0.272) + (g*0.534) + (b*0.131)) + (1-amount)*b;
        
        if(outr > 255){outr = 255; }
        if(outg > 255){outg = 255; }
        if(outb > 255){outb = 255; }
        
        dst.data[i] = outr;
        dst.data[i+1] = outg;
        dst.data[i+2] = outb;

    }
    this.image.setPixelData(dst);
};
