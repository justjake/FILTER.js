// Hue and Saturation Filter
// By: Evan Lee
// Note: hue input ranges from -180 to 180
//       saturation ranges from -100 to 100
FILTER.HueSaturation=function(image)
{
	this.image=image;
};
FILTER.HueSaturation.prototype=new FILTER.Filter(); 
FILTER.HueSaturation.prototype.constructor=FILTER.HueSaturation; 
FILTER.HueSaturation.prototype.apply=function(hue, saturation) 
{
    var original = this.image.getPixelData();
    var height = original.height;
    var width = original.width;
    var dst = this.image.clone().getPixelData();
   
    for (var i=0; i<width*height*4; i += 4){
            //convert RGB to HSV
            var r = original.data[i] / 256;
            var g = original.data[i+1] / 256;
            var b = original.data[i+2] / 256;
            var HSV  = RGB2HSV(r,g,b);
            
            //add new h and s values, set wrapping for h
            var h = HSV[0] + hue;
            if (h > 360){ 
                h -= 360;
            }
            else if(h < 0){ 
                h += 360;
            }
            
            var s = HSV[1] + (1-HSV[1])*(saturation/100);
            if (s > 1){
                s = 1;
            }
            else if (s < 0){
                s = 0;
            }
            
            //convert back to RGB
            var RGB = HSV2RGB(h,s,HSV[2]);
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
    else if( b<=r && b<=g){ min = b; }
    
    var max = 0;
    if( r>=g && r>=b){ max = r; }
    else if( g>=r && g>=b){ max = g; }
    else if( b>=r && b>=g){ max = b; }
    
    v = max;
    var delta = max-min;
    
    if( max != 0 ){ s = delta/max; }
    else { s = 0; h = -1; }
    
    if( max == r){
        h = 60*(g-b);
    }
    else if ( max == g){
        h = 120 + 60*(b-r);
    }
    else{
        h = 240 + 60*(r-g);
    }
    
    if( h<0){ h += 360 };
    
    return ([h,s,v]);
}

function HSV2RGB (h, s, v) {
    var r;
    var g;
    var b;
    if( s==0) {
        r = g = b = v;
        return ([r,g,b]);
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
		default:
			r = v;
			g = p;
			b = q;
			break;
	}
    return ([r*255,g*255,b*255]);
}
