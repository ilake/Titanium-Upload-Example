// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Create view container (allows us to do nice transitions)
var viewContainer = Titanium.UI.createView({
  top:60,
  width:320,
  height:420
});

// create base UI tab and root window
var win = Titanium.UI.createWindow({  
    title:'Upload Image Example'
});

var label = Ti.UI.createLabel({
  text: 'Choose an image:',
  textAlign:'center',
  font:{
    fontSize:24,
    fontFamily:'Trebuchet MS',
    fontWeight:'bold',
    fontStyle:'italic'
  },
  height:'auto',
  width:'auto',
  color:'#fff',
  top:5
});

var gallery = Titanium.UI.createButton({
	title: 'Photo Albums',
	top:100,
	width:229,
	height:42
});


gallery.addEventListener("click", function(e) {
  Titanium.Media.openPhotoGallery({
  	success:function(event) {
  		var theImage = event.media;

  		var xhr = Titanium.Network.createHTTPClient();

  		xhr.onload = function() {	
			label.text = 'Upload Complete! Choose another image';   	  
  		};
	
  		xhr.open('POST','http://localhost:3000/v1_0/photos.json');
	
  		xhr.send({
    		photo:theImage
  		});
  	},
  	allowImageEditing:true
  });
});

viewContainer.add(label);
viewContainer.add(gallery);
win.add(viewContainer);


win.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});

