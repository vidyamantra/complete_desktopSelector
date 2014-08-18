window.addEventListener('message', function (event) { 
    if (event.origin != window.location.origin) {
        return;
    }
    
    if (event.data.type == 'gotScreen') {
        var constraints;
        if (event.data.sourceId === '') { // user canceled
            var error = new Error('NavigatorUserMediaError');
            error.name = 'PERMISSION_DENIED';
            callback(error);
        } else {
            constraints = constraints || {audio: false, video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: event.data.sourceId,
                },
                optional: [
                    {maxWidth: window.screen.width},
                    {maxHeight: window.screen.height},
                    {maxFrameRate: 3},
                    {googLeakyBucket: true},
                    {googTemporalLayeredScreencast: true}
                ]
            }};
        
            navigator.getUserMedia(constraints, initializeRecorder, onError);
            //the stream we can get here with initalizeRecorder() 
        }
    } else if (event.data.type == 'getScreenPending') {
        window.clearTimeout(event.data.id);
    }
})