var manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';    

var url1 = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
var url2 = 'https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd';
var url3 = 'https://storage.googleapis.com/shaka-demo-assets/heliocentrism/heliocentrism.mpd';
var url4 = 'https://storage.googleapis.com/shaka-demo-assets/tos-ttml/dash.mpd';

var lang;
var textTracks;
var player;

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }

  // Update the online status and add listeners so that we can visualize
  // our network state to the user.
  updateOnlineStatus();
  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
}


function loadvideo(videoId){
  console.log(videoId);
  // load correct manifesturi to player
  //var selVideo = document.getElementById("selVideo");
  var selVideo = document.getElementById(videoId);
  var video1 = selVideo.innerHTML;
  var title_name = document.getElementById("video_name");

 

  asset_name = video1;
  asset_manifest = manifestUri;
  
  console.log(video1);
  if(video1 == "Star Trek: Angel One"){
    manifestUri = url1;
    console.log(video1);
    title_name.innerHTML = video1;
    console.log(manifestUri);
  } else if(video1 == "Sintel"){
    manifestUri = url2;
   title_name.innerHTML = video1;
    console.log(manifestUri);

  }else if(video1 == "Helio Centrism"){
    manifestUri = url3;
   title_name.innerHTML = video1;
    console.log(manifestUri);

  }else if(video1 == "Tears of Steel"){
    manifestUri = url4;
    title_name.innerHTML = video1;
    console.log(manifestUri);

  }
  
  player.load(manifestUri).then(function() {
    // This runs if the asynchronous load is successful.
   
    textTracks = player.getTextTracks();
   // console.log("text tracks 11111");
    console.log(textTracks);
    //subtitles.src = texTracks[1];
    console.log('The video has now been loaded!');
    

  }).catch(onError); 
  //texTracks = console.log(player.getTextTracks());
  //Player = player;
  //console.log(textTracks);
  /** player.configure(
    "textDisplayFactory", new shaka.text.SimpleTextDisplayer(video));*/
  //initStorage(player); 
  //initStorage(player);

  //var downloadButton = window.window.document.getElementById('download-button');
  //downloadButton.onclick = onDownloadClick;

  //var asset_name1 = document.getElementById('asset-title-input'); 
  //var asset_manifest2 = document.getElementById('asset-uri-input');

  //asset_name1.value = asset_name;
  //asset_manifest2.value = asset_manifest;

  // Update the content list to show what items we initially have
  // stored offline.
  refreshContentList();
}



function initPlayer() {
  // Create a Player instance.

  var video = window.document.getElementById('video');
  const videoContainer = document.getElementById('videoContainer');
  var player = new shaka.Player(video);

   // Use this to pass in desired config values.  Config values not passed in
  // will be filled out according to the default config.
  // See more info on the configuration in the section below.
  const uiConfig = {};
  const ui = new shaka.ui.Overlay(player, videoContainer, video, uiConfig);
  const controls = ui.getControls();

  // Listen for error events.
  player.addEventListener('error', onPlayerErrorEvent);
  controls.addEventListener('error', onUIErrorEvent);
  controls.addEventListener('caststatuschanged', onCastStatusChanged);
  
  
function onPlayerErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(event.detail);
}

function onPlayerError(error) {
  // Handle player error
}

function onUIErrorEvent(errorEvent) {
  // Handle UI error
}

function onCastStatusChanged(event) {
  // Handle cast status change
}

  player.configure("textDisplayFactory", new shaka.text.SimpleTextDisplayer(video));
  
  
 // var estimator = new shaka.util.EWMABandwidthEstimator();
 // var source = new shaka.Player.DashVideoSource(manifestUri, null, estimator);


  // Attach player and storage to the window to make it easy to access
  // in the JS console and so we can access it in other methods.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);
  console.log(manifestUri);
  player.load(manifestUri).then(function() {
    /*textTracks = player.getTextTracks();
    setTextTrack(textTracks, player);*/
    // This runs if the asynchronous load is successful.
    textTracks = player.getTextTracks();
   // console.log("text tracks 11111");
    console.log(textTracks);
    console.log('The video has now been loaded!');
   
  }).catch(onError);  // onError is executed if the asynchronous load fails.

  initStorage(player);

  //var downloadButton = window.window.document.getElementById('download-button');
  //downloadButton.onclick = onDownloadClick;

  /*var asset_name1 = document.getElementById('asset-title-input'); 
  var asset_manifest2 = document.getElementById('asset-uri-input');

  asset_name1.value = asset_name;
  asset_manifest2.value = asset_manifest;*/

  // Update the content list to show what items we initially have
  // stored offline.
  refreshContentList();
}

/*myTextDisplayer = function(video){
  console.log("text displayer is called");
  console.log(video);
  //console.log(textTracks);
  this.textTrack_ = null;
  //text_Tracks = Player.getTextTracks();
 // console.log(text_Tracks);
  // TODO: Test that in all cases, the built-in CC controls in the video element
  // are toggling our TextTrack.
  // If the video element has TextTracks, disable them.  If we see one that
  // was created by a previous instance of Shaka Player, reuse it.
  for (let i = 0; i < video.textTracks.length; ++i) {
    let track = video.textTracks[i];
    track.mode = 'disabled';
    if (track.label == shaka.text.SimpleTextDisplayer.TextTrackLabel_) {
      this.textTrack_ = track;
    }
  }
  if (!this.textTrack_) {
    // As far as I can tell, there is no observable difference between setting
    // kind to 'subtitles' or 'captions' when creating the TextTrack object.
    // The individual text tracks from the manifest will still have their own
    // kinds which can be displayed in the app's UI.
    this.textTrack_ = video.addTextTrack(
        'subtitles', shaka.text.SimpleTextDisplayer.TextTrackLabel_);
  }
  //this.textTrack_.mode = 'hidden';
  console.log(video.textTracks);
} */

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

function selectTracks(tracks) {
  // Store the highest bandwidth variant.
  var found = tracks
      .filter(function(track) {
        //console.log(lang.slice(0, 2));
        //console.log(track);
        var setLang = lang.slice(0, 2).toLowerCase();
        console.log(setLang);
        if (setLang == 'un'){
          return track
        }else{
        return track, track.language == setLang}})
       .sort(function(a, b) { return a.bandwidth - b.bandwidth; })
      .pop();

  //console.log('Offline Track bandwidth: ' + found.bandwidth);
  //console.log(found);
  //var found = [found1, found2];      
  return [found];

}

function initStorage(player) {
  // Create a storage instance and configure it with optional
  // callbacks. Set the progress callback so that we visualize
  // download progress and override the track selection callback.
  window.storage = new shaka.offline.Storage(player);
  
  window.storage.configure({
   progressCallback: setDownloadProgress,
  trackSelectionCallback: selectTracks
  });
  
}

function listContent() {
  return window.storage.list();
}

function playContent(content) {
  window.player.load(content.offlineUri);
  
}

function removeContent(content) {
  return window.storage.remove(content.offlineUri);
}

function downloadContent(manifestUri, title) {
  // Construct a metadata object to be stored along side the content.
  // This can hold any information the app wants to be stored with the
  // content.
  var metadata = {
    'title': title,
    'downloaded': Date()
  };
  setTextTrack(textTracks, player, lang);
  return window.storage.store(manifestUri, metadata);
}

/*
 * UI callback for when the download button is clicked. This will
 * disable the button while the download is in progress, start the
 * download, and refresh the content list once the download is
 * complete.
 */
function onDownloadClick() {
  var downloadButton = window.document.getElementById('download-button');
  //var manifestUri = window.document.getElementById('asset-uri-input').value;
  var title = window.document.getElementById('video_name').innerHTML;

  var langElements = document.getElementsByClassName('shaka-current-selection-span');
  lang = langElements[2].innerHTML;
  console.log(lang);
  
  // Disable the download button to prevent user from requesting
  // another download until this download is complete.
  downloadButton.disabled = true;

  setDownloadProgress(null, 0);

  // Download the content and then re-enable the download button so
  // that more content can be downloaded.
  downloadContent(manifestUri, title)
    .then(function() {
      return refreshContentList();
    })
    .then(function(content) {
      setDownloadProgress(null, 1);
      downloadButton.disabled = false;
    })
    .catch(function(error) {
      // In the case of an error, re-enable the download button so
      // that the user can try to download another item.
      downloadButton.disabled = false;
      onError(error);
    });

   
}

/*
 * Update the online status box at the top of the page to tell the
 * user whether or not they have an internet connection.
 */
function updateOnlineStatus() {
  var signal = window.document.getElementById('online-signal');
  if (navigator.onLine) {
    signal.innerHTML = 'ONLINE';
    signal.style.background = 'green';
  } else {
    signal.innerHTML = 'OFFLINE';
    signal.style.background = 'grey';
  }
}

/*
 * Find our progress bar and set the value to show the progress we
 * have made.
 */
function setDownloadProgress(content, progress) {
  var progressBar = window.document.getElementById('progress-bar');
  progressBar.value = progress * progressBar.max;
}

/*
 * Clear our content table and repopulate it table with the current
 * list of downloaded content.
 */
function refreshContentList() {
  var contentTable = window.document.getElementById('content-table');
  //window.document.getElementById('table').style.visibility = "visible";

  // Clear old rows from the table.
  while (contentTable.rows.length) {
    contentTable.deleteRow(0);
  }

  var addRow = function(content) {
    
    window.document.getElementById('table').style.visibility = "visible";
    /*if (contentTable.rows.length == 0) {
      window.document.getElementById('table').style.visibility = "hidden";
    }*/
    var append = -1;
    var serialNumber;
    var row = contentTable.insertRow(append);
    //row.insertCell(append).innerHTML = content.offlineUri;
    serialNumber = contentTable.rows.length;
    row.insertCell(append).innerHTML = serialNumber;
    Object.keys(content.appMetadata)
        .map(function(key) {
          return content.appMetadata[key];
        })
        .forEach(function(value) {
          row.insertCell(append).innerHTML = value;
        });

    row.insertCell(append).appendChild(createButton(
        'PLAY',
        function() { playContent(content); }));

    row.insertCell(append).appendChild(createButton(
        'REMOVE',
        function() {
          removeContent(content)
              .then(function() { refreshContentList();
                if (contentTable.rows.length == 0) {
      window.document.getElementById('table').style.visibility = "hidden";
    }
               });
        }));
  };

  return listContent()
      .then(function(content) { content.forEach(addRow); });
};

/*
 * Create a new button but do not add it to the DOM. The caller
 * will need to do that.
 */
function createButton(text, action) {
  var button = window.document.createElement('button');
  button.innerHTML = text;
  button.onclick = action;
  return button;
}

window.document.addEventListener('DOMContentLoaded', initApp);


 function setTextTrack(textTracks, player, lang){
  var video = window.document.getElementById('video');
   player.configure("textDisplayFactory", new shaka.text.SimpleTextDisplayer(video));
  const on = true;
  var id;
  var setLang = lang.slice(0, 2).toLowerCase();
  //var json = JSON.parse(textTracks);
  //var size = Object.keys(textTracks).length;
  //var [ textjson ] = textTracks;
  var size = Object.keys(textTracks).length;
  console.log(size);
  for(var i=0; i < size; i++){
    console.log(i);
    var textLanguage = textTracks[i].language;
    console.log(textLanguage);
    if( textLanguage == setLang){
      id = i;
    }
  }
  //console.log(textTracks);
  console.log(textTracks[id]);
  player.setTextTrackVisibility(true);
  player.selectTextLanguage(setLang);
  player.selectTextTrack(textTracks[id]);
  console.log(player.isTextTrackVisible());
}


