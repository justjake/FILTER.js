// TiltShift Filter
// By: Evan Lee
// Input ranges:
// ystart: 
FILTER.TiltShift=function(image)
{
	this.image=image;
};
FILTER.TiltShift.prototype=new FILTER.Filter(); 
FILTER.TiltShift.prototype.constructor=FILTER.TiltShift; 
FILTER.TiltShift.prototype.apply=function(ystart, yend, maxblur, dist) 
{
    var original = this.image.getPixelData();
    var height = original.height;
    var width = original.width;
    var dst = this.image.clone().getPixelData();
    new FILTER.ConvolutionMatrixFilter(this.image).blur4().apply();
    var blur = this.image.getPixelData();
    var xstart = 0;
    var xend = width;
    
    for (var i=0; i<height; i++){
        for (var j=0; j<width*4; j=j+4){
            var ydes = current_y(xstart, xend, j/4, ystart, yend);
            var curr_dist = Math.abs(i - ydes);
            if ( curr_dist > dist && i < (ydes)){
                var factor = (maxblur/100) * ((ydes - dist)-i)/(ydes-dist);
                dst.data[i*width*4 +j] = blur.data[i*width*4 +j];
                dst.data[i*width*4 +j +1] = blur.data[i*width*4 +j +1];
                dst.data[i*width*4 +j +2] = blur.data[i*width*4 +j +2];
            }
            else if ( curr_dist > dist && i > (ydes)){
                var factor = (maxblur/100)*((i-(ydes+dist))/(height - (ydes+dist)));
                dst.data[i*width*4 +j] = blur.data[i*width*4 +j];
                dst.data[i*width*4 +j +1] = blur.data[i*width*4 +j +1];
                dst.data[i*width*4 +j +2] = blur.data[i*width*4 +j +2];
             }
            else{ 
                var factor = 0; 
                dst.data[i*width*4 +j] = original.data[i*width*4 +j];
                dst.data[i*width*4 +j +1] = original.data[i*width*4 +j +1];
                dst.data[i*width*4 +j +2] = original.data[i*width*4 +j +2];
            }
            if(factor > 1){factor = 1};

            dst.data[i*width*4 + j] = (1-factor)*original.data[i*width*4 + j]+ factor*blur.data[i*width*4 + j];
            dst.data[i*width*4 + j +1] =(1-factor)*original.data[i*width*4 +j +1] + factor*blur.data[i*width*4 + j +1];
            dst.data[i*width*4 + j +2] = (1-factor)*original.data[i*width*4 +j +2] + factor*blur.data[i*width*4 + j+2];
        }
    }
    this.image.setPixelData(dst);
};

function current_y(xstart, xend, xcurr, ystart, yend){
    var slope = (yend - ystart) / (xend - xstart);
    var ydes = slope*(xcurr - xstart) + ystart;
    return ydes;
}