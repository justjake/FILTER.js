// Threshold and Edge Detected Gray Filter
<<<<<<< HEAD
FILTER.GreyEdge=function(image)
{
	this.image=image;
	//	this.initialPixelData = image.getPixelData();
=======
// By: Evan Lee
FILTER.GreyEdge=function(image)
{
	this.image=image;
    this.initialImage = null;
>>>>>>> First Commit
};
FILTER.GreyEdge.prototype=new FILTER.Filter(); 
FILTER.GreyEdge.prototype.constructor=FILTER.GreyEdge; 
FILTER.GreyEdge.prototype.apply=function(value) 
{
<<<<<<< HEAD
    console.log("Applying GreyEdge filter");
    /**
    if(this.initialImage == null){
        this.initialImage = this.image;
    }
    **/
=======
    if(this.initialImage == null){
        this.initialImage = this.image;
    }
>>>>>>> First Commit
	var dst=[];
    var thresh = [];
    //Edge Detect Greyscale
    new FILTER.Sobel(this.image).apply();
    var gray = this.image.getPixelData();
    new FILTER.ColorMatrixFilter(this.image).grayscale().apply();
    
    //Threshold Greyscale
	for (var i=0; i<gray.data.length; i+=4) {
        var L = 0.21*gray.data[i] + 0.71*gray.data[i+1] + 0.07*gray.data[i+3];
        if(L >= value){
            thresh[i] = 255 -L;
            thresh[i+1] = 255 -L;
            thresh[i+2] = 255 - L;
            thresh[i+3] = 255;
        }
        else{
            thresh[i] = thresh[i+1] = thresh[i+2] = 255;
            thresh[i+3] = 255;
        }
    }
    dst = thresh;    
    
	var data = this.image.getPixelData();
	for (var i=0;i<data.data.length;i++){
        data.data[i]=dst[i];}
  this.image.setPixelData(data,0,0);
};
FILTER.GreyEdge.prototype.reset=function(){
    console.log(this.initialImage);
	var data = this.initialImage.getPixelData();
    var dst=[];
	for (var i=0;i<data.data.length;i++){
        data.data[i]=dst[i];}
    this.image.setPixelData(data,0,0);
    
}