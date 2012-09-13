// Thermal Filter
// By: Evan Lee
FILTER.Thermal=function(image)
{
	this.image=image;
};
FILTER.Thermal.prototype=new FILTER.Filter(); 
FILTER.Thermal.prototype.constructor=FILTER.Thermal; 
FILTER.Thermal.prototype.apply=function(offset, saturation, value, range) 
{
    var original = this.image.getPixelData();
    var height = original.height;
    var width = original.width;
    var dst = this.image.clone().getPixelData();
    new FILTER.ColorMatrixFilter(this.image).grayscale().apply();
    var gray = this.image.getPixelData();
    
    for (var i=0; i<width*height*4; i=i+4){
            //convert RGB to HSV
            var r = original.data[i];
            var g = original.data[i+1];
            var b = original.data[i+2];
            //var HSV  = RGB2HSV(r,g,b);
            var graypix = gray.data[i] /255;
            graypix = graypix * 360 *range
            graypix = graypix - offset;
            if ( graypix < 0 ){
                graypix += 360;
            }
            var HSV = [graypix, saturation/255, value/255];
            var RGB = HSV2RGB(HSV[0],HSV[1],HSV[2]);
            
            dst.data[i] = RGB[0];
            dst.data[i+1] = RGB[1];
            dst.data[i+2] = RGB[2];
    }
    this.image.setPixelData(dst);
};

function RGB2HSV (r, g, b){
    var h = 0;
    var s = 0;
    var v = 0;
    
    var min = 0;
    if( r<=g && r<=b){ min = r; }
    else if( g<=r && g<=b){ min = g; }
    else { min = b;}
    
    var max = 0;
    if( r>=g && r>=b){ max = r; }
    else if( g>=r && g>=b){ max = g; }
    else { max = b; }
    
    v = max;
    var delta = max-min;
    
    if( max != 0 ){ s = delta/max; }
    else { s = 0; h = -1; }
    
    if( r == max ){ h = g - b;}
    else if( g == max ){ h = 2 + (b-r); }
    else { h = 4  + (r-g); }
    
    h *= 60;
    
    if( h<0){ h += 360 };
    
    return ([h,s,v]);
}

function HSV2RGB (h, s, v) {
    var r;
    var g;
    var b;
    if( s==0) {
        r = g = b = v;
    }
    h /= 60;
        
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1-s);
    var q = v * (1-s * f);
    var t = v * (1-s * (1-f));

    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
			r = p;
			g = v;
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = v;
			break;
		case 4:
			r = t;
			g = p;
			b = v;
			break;
		default:		// case 5:
			r = v;
			g = p;
			b = q;
			break;
	}
    return ([r*255,g*255,b*255]);
}
