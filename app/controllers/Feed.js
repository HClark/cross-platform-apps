

OS_IOS && $.cameraButton.addEventListener("click", function(_event){
	$.cameraButtonClicked(_event);
});

$.cameraButtonClicked= function(_event){
	var photoSource = Titanium.Media.getIsCameraSupported() ?
	Titanium.Media.showCamera : Titanium.Media.openPhotoGallery;

photoSource ({
	success: function(event) {
		processImage(event.media, function(photoResp){
		var row = Alloy.createController("feedRow", photoResp);
		if($.feedTable.getData().length === 0) {
				$.feedTable.setData([]);
				$.feedTable.appendRow(row.getView(), true);
		}else{
				$.feedTable.insertRowBefore(0, row.getView(), true);
		}
		});
	},
	cancel: function() {
	
	},
	error: function(error) {
		if(error.code == Titanium.Media.NO_CAMERA){
			alert("Please run this test on device");
		}else{
			alert("Unexpected error: " + error.code);
		}
	},
	
	saveToPhotoGallery: false,
	allowEditing : true,
	mediaType: [Ti.Media.MEDIA_TYPE_PHOTO]
});

function processImage(_mediaObject, _callback){
	var photoObject = {
		image: _mediaObject,
		title: "Sample Photo " + new Date()
	};
	_callback(photoObject);
}
};


