function submit() {
    var id =  document.getElementById('input').value;
    $.getJSON("https://graph.facebook.com/" + id  + "?%20fields=id,name,picture,username,gender", function(json){
        document.getElementById('data').innerHTML = 
            "Name: " + json.name + "<br>" +
            "Gender: " + json.gender + "<br>" +
            "UserName: " + json.username + "<br>" +
            "Id: " + json.id + "<br>";

        var xhr = new XMLHttpRequest();
        xhr.open( "GET", json.picture.data.url , true );
        xhr.responseType = "arraybuffer";
        xhr.onload = function( e ) {
            var arrayBufferView = new Uint8Array( this.response );
            var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL( blob );
            var img = document.querySelector( "#photo" );
            img.src = imageUrl;
        };
        xhr.send();
    });
}