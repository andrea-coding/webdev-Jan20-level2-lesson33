//geolocation api

var myGeo = navigator.geolocation.getCurrentPosition(function(position){
    var latIng = new google.maps.latIng(position.coords.latitude,position.coords.longitude);
    var myOptions = {
        zoom: 8,
        center:lating,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        disableDefautltUI: true
    }
    var map = new google.maps.Map(document.querySelector("#map_canvas"), myOptions);
});
    var position = navigator.geolocation.getCurrentPosition();
    var myLatitude = position.coords.latitude;
    var latIng = new google.maps.latIng(
        position.coords.latitude.position.coords.longitude
    );
    // var em = document.createElement('em');
    // var para = document.querySelector('p');
    // em.textContent = "hello there!";
    // para.appendChild(em);

        //canvas

    var canvas = document.querySelector('canvas');
    var stx = canvas.getContext('2d');
    Ball.prototype.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0,2 *Math.PI);
    };

    // client side storage api's
    localStorage.setItem('myCaat','Tom');
    localStorage.getItem("myCat");
    localStorage.removeItem("myCat");

    // check for storage availability

    function storageAvaible(type){
        try {
            var storage = window[type],
            x = '___storage_test___';
            storage.setItem(x,x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                //everything except Firefox
                e.code === 22 ||
                //firefox
                e.code === 1024 ||
                //test name field too, because code might not be present
                //everything except Firefox
                e.name === 'QuotaExceededError' ||
                //firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // aknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0;
            
        }
    }
    // we can implement the following function like this
    if (storageAvaible('localStorage')) {
        // yippee ! We can use localStorage awesomeness
    }
    else {
        //too had , no localStorage for us
    }
    // storageAvaible('sessionStorage')

    //Check for the various File API support.

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // great success! All the File APIs are supported 
    }else {
        alert('The file APIs are not fully sippported in this browser.');
    }
    //file demo
    // first method
    function handleFileSelect(evt) {
        var files = evt.target.files; //Files object
        
        // files is a filelist of list objects. list some properties.
        var output = [];

        for (var i=0, f; f = files[i]; i++) {
            output.push('<li><strong>', escape(f.name), '</strong> (',
            f.type || 'n/a',') - ',
                    f.size, 'bytes,last modified: ',
                    f.lastModifiedDate ?
            f.lastModifiedDate.tolocaleDateString() : 'n/a', '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' +
    output.join('') + '</ul>';
    }
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
           
    
        


    // drag and drop api
    // another technique
    function handleFileSelect(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        
        var files = evt.dataTransfer.files;// fileList object
        // files is a FileList of File objects. List some properties..
        var output = [];
        for(var i= 0, f; f= files[i]; i++){
                output.push('<li><strong>', escape(f.name), '</strong> (',
                f.type || 'n/a',') - ',
                        f.size, 'bytes,last modified: ',
                        f.lastModifiedDate ?
                f.lastModifiedDate.tolocaleDateString() : 'n/a', '</li>');
        }
        document.getElementById('list').innerHTML = '<ul>' +
        output.join('') + '</ul>';
        }

    function handleDragOver(evt) {
        evt.stopPropagation()
        evt.preventDefault()

        
        evt.dataTransfer.dropEffect = 'copy'; // explicily show this is a copy.
    }
    //Setup the dnd listeners
    var dropzone = document.getElementById('drop_zone');
    dropzone.addEventListener('dragover', handleDragOver,false);
    dropzone.addEventListener('drop', handleFileSelect, false);



    // reading an uploaded files 

    function handleFilesSelect(evt) {
        var files = evt.target.files; // fileslist object
        //loop through the Fileslist and render image files as thumbnails.
        for (var i= 0, f; f = files[i]; i++) {
        // only progress image files
        if   (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FilesReader();
        // Closure to capture the files information
        reader.onload = (
             (theFiles)=>  {
            return function(e) {
                // render thumbail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="',
                e.target.result,'"title"', escape(theFiles.name),
                '"/>'].join('');
                document.getElementById('list').insertBefore(span, null);
            };
        })(f);
        reader.readAsDataURL(f);
        }
    }
    document.getElementById('files').addEventListener('change',
    handleFileSelect, false);


    var blob = file.slice(startingByte, endindByte);
    reader.readAsBinaryString(blob);


    var reader;
            var progress = document.querySelector('.percent')

            function abortRead() {
                reader.abort();
            }

             function errorHandler(evt) {
                 switch(evt.target.error.code) {
                     case evt.target.error.NOT_FOUND_ERR:
                     alert('File not Found');
                     break;
                     case evt.target.error.NOT_READABLE_ERR:
                     alert('File is not readable');
                     break;
                     case evt.target.error.ABORT_ERR: 
                     break;// noop
                     default:
                     alert('An erroe occurred reading this file,');

                 };
             }

             function updateProgress(evt) {
                 // evt is an progressEvent.
                 if(evt.lengthComputable) {
                     var percentLoaded = math.round((evt.loaded / evt.total) * 100);
                     //Increase the progress bar lenght.
                     if(percentLoaded < 100) {
                         progress.style.width = percentLoaded + '%';
                         progress.textContent = percentLoaded + '%';
                     }
                 }
             }
             function handleFileSelect(evt) {
                 // reset progress indeicator on new file slection.
                 progress.style.width ='0%';
                 progress.textContent = '0%';

                 reader= new FileReader();
                 reader.onerror =  errorHandler;
                 reader.onprogress = updateProgress;
                 reader.onabort = function(e) {
                     alert('File read cancelled');
                 };
                 reader.onloadstart = function(e) {
                     document.getElementById('progress_bar').className = 'loading';
                 };
                 reader.onload = function(e) {
                     // ensure that the progress bar displays 100% at the end.
                     progress.style.width = '100%';
                     progress.textContent = '100%';
                     

                     setTimeout("document.getElementById('progress_bar').className='';",
                      2000);
                 }
                      // Read in the image file as a binary string
                      reader.readAsBinaryString(evt.target.files[0]);

             
             }

             document.getElementById('files').addEventListener('change',handleFileSelect, false);
   