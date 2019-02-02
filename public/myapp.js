var manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';    

var url1 = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
var url2 = 'https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd';
var url3 = 'https://storage.googleapis.com/shaka-demo-assets/heliocentrism/heliocentrism.mpd';
var url4 = 'https://storage.googleapis.com/shaka-demo-assets/tos-ttml/dash.mpd';



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
  // load correct manifesturi to player
  //var selVideo = document.getElementById("selVideo");
  var selVideo = document.getElementById(videoId);
  var video1 = selVideo.innerHTML;
 

  asset_name = video1;
  asset_manifest = manifestUri;
  
  console.log(video1);
  if(video1 == "Star Trek: Angel One"){
    manifestUri = url1;
    console.log(manifestUri);
  } else if(video1 == "Sintel"){
    manifestUri = url2;
    console.log(manifestUri);

  }else if(video1 == "Helio Centrism"){
    manifestUri = url3;
    console.log(manifestUri);

  }else if(video1 == "Tears of Steel"){
    manifestUri = url4;
    console.log(manifestUri);

  }
  player.load(manifestUri).then(function() {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  }).catch(onError); 

  initStorage(player);

  var downloadButton = window.window.document.getElementById('download-button');
  downloadButton.onclick = onDownloadClick;

  var asset_name1 = document.getElementById('asset-title-input'); 
  var asset_manifest2 = document.getElementById('asset-uri-input');

  asset_name1.value = asset_name;
  asset_manifest2.value = asset_manifest;

  // Update the content list to show what items we initially have
  // stored offline.
  refreshContentList();
}

function initPlayer() {
  // Create a Player instance.
  var video = window.document.getElementById('video');
  var player = new shaka.Player(video);

  /*player.configure("AbrConfiguration", true, "textDisplayFactory", 
  new SimpleTextDisplayer(video) // Or whatever you called the new class.
  );*/

  player.configure({
    textDisplayFactory: new shaka.text.SimpleTextDisplayer(video),
    AbrConfiguration: true
  });
 // var estimator = new shaka.util.EWMABandwidthEstimator();
 // var source = new shaka.Player.DashVideoSource(manifestUri, null, estimator);


  // Attach player and storage to the window to make it easy to access
  // in the JS console and so we can access it in other methods.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);
  console.log(manifestUri);
  player.load(manifestUri).then(function() {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  }).catch(onError);  // onError is executed if the asynchronous load fails.

  initStorage(player);

  var downloadButton = window.window.document.getElementById('download-button');
  downloadButton.onclick = onDownloadClick;

  var asset_name1 = document.getElementById('asset-title-input'); 
  var asset_manifest2 = document.getElementById('asset-uri-input');

  asset_name1.value = asset_name;
  asset_manifest2.value = asset_manifest;

  // Update the content list to show what items we initially have
  // stored offline.
  refreshContentList();


}

function textDisplay(video){
  
  console.log("textDisplay called");
  /**
 * <p>
 * This defines the default text displayer plugin. An instance of this
 * class is used when no custom displayer is given.
 * </p>
 * <p>
 * This class simply converts shaka.text.Cue objects to
 * TextTrackCues and feeds them to the browser.
 * </p>
 *
 * @param {HTMLMediaElement} video
 * @constructor
 * @struct
 * @implements {shakaExtern.TextDisplayer}
 * @export
 */
shaka.text.SimpleTextDisplayer = function(video) {
  console.log("called function text");
  /** @private {TextTrack} */
  this.textTrack_ = null;
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
  this.textTrack_.mode = 'hidden';
};
/**
 * @override
 * @export
 */
shaka.text.SimpleTextDisplayer.prototype.remove = function(start, end) {
  // Check that the displayer hasn't been destroyed.
  if (!this.textTrack_) return false;
  let removeInRange = (cue) => {
    let outside = cue.startTime >= end || cue.endTime <= start;
    let inside = !outside;
    return inside;
  };
  shaka.text.SimpleTextDisplayer.removeWhere_(this.textTrack_, removeInRange);
  return true;
};
/**
 * @override
 * @export
 */
shaka.text.SimpleTextDisplayer.prototype.append = function(cues) {
  const convertToTextTrackCue =
      shaka.text.SimpleTextDisplayer.convertToTextTrackCue_;
  // Convert cues.
  let textTrackCues = [];
  for (let i = 0; i < cues.length; i++) {
    let cue = convertToTextTrackCue(cues[i]);
    if (cue) {
      textTrackCues.push(cue);
    }
  }
  // Sort the cues based on start/end times.  Make a copy of the array so
  // we can get the index in the original ordering.  Out of order cues are
  // rejected by IE/Edge.  See https://goo.gl/BirBy9
  let sortedCues = textTrackCues.slice().sort(function(a, b) {
    if (a.startTime != b.startTime) {
      return a.startTime - b.startTime;
    } else if (a.endTime != b.endTime) {
      return a.endTime - b.startTime;
    } else {
      // The browser will display cues with identical time ranges from the
      // bottom up.  Reversing the order of equal cues means the first one
      // parsed will be at the top, as you would expect.
      // See https://github.com/google/shaka-player/issues/848 for more info.
      return textTrackCues.indexOf(b) - textTrackCues.indexOf(a);
    }
  });
  sortedCues.forEach(function(cue) {
    this.textTrack_.addCue(cue);
  }.bind(this));
};
/**
 * @override
 * @export
 */
shaka.text.SimpleTextDisplayer.prototype.destroy = function() {
  if (this.textTrack_) {
    let removeIt = (cue) => true;
    shaka.text.SimpleTextDisplayer.removeWhere_(this.textTrack_, removeIt);
  }
  this.textTrack_ = null;
  return Promise.resolve();
};
/**
 * @override
 * @export
 */
shaka.text.SimpleTextDisplayer.prototype.isTextVisible = function() {
  return this.textTrack_.mode == 'showing';
};
/**
 * @override
 * @export
 */
shaka.text.SimpleTextDisplayer.prototype.setTextVisibility = function(on) {
  this.textTrack_.mode = on ? 'showing' : 'hidden';
};
/**
 * @param {!shakaExtern.Cue} shakaCue
 * @return {TextTrackCue}
 * @private
 */
shaka.text.SimpleTextDisplayer.convertToTextTrackCue_ = function(shakaCue) {
  if (shakaCue.startTime >= shakaCue.endTime) {
    // IE/Edge will throw in this case.
    // See issue #501
    shaka.log.warning('Invalid cue times: ' + shakaCue.startTime +
                      ' - ' + shakaCue.endTime);
    return null;
  }
  const Cue = shaka.text.Cue;
  /** @type {VTTCue} */
  let vttCue = new VTTCue(shakaCue.startTime,
                          shakaCue.endTime,
                          shakaCue.payload);
  // NOTE: positionAlign and lineAlign settings are not supported by Chrome
  // at the moment, so setting them will have no effect.
  // The bug on chromium to implement them:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=633690
  vttCue.lineAlign = shakaCue.lineAlign;
  vttCue.positionAlign = shakaCue.positionAlign;
  vttCue.size = shakaCue.size;
  try {
    // Safari 10 seems to throw on align='center'.
    vttCue.align = shakaCue.textAlign;
  } catch (exception) {}
  if (shakaCue.textAlign == 'center' && vttCue.align != 'center') {
    // We want vttCue.position = 'auto'. By default, |position| is set to
    // "auto". If we set it to "auto" safari will throw an exception, so we
    // must rely on the default value.
    vttCue.align = 'middle';
  }
  if (shakaCue.writingDirection ==
          Cue.writingDirection.VERTICAL_LEFT_TO_RIGHT) {
    vttCue.vertical = 'lr';
  } else if (shakaCue.writingDirection ==
           Cue.writingDirection.VERTICAL_RIGHT_TO_LEFT) {
    vttCue.vertical = 'rl';
  }
  // snapToLines flag is true by default
  if (shakaCue.lineInterpretation == Cue.lineInterpretation.PERCENTAGE) {
    vttCue.snapToLines = false;
  }
  if (shakaCue.line != null) {
    vttCue.line = shakaCue.line;
  }
  if (shakaCue.position != null) {
    vttCue.position = shakaCue.position;
  }
  return vttCue;
};
/**
 * Iterate over all the cues in a text track and remove all those for which
 * |predicate(cue)| returns true.
 *
 * @param {!TextTrack} track
 * @param {function(!TextTrackCue):boolean} predicate
 * @private
 */
shaka.text.SimpleTextDisplayer.removeWhere_ = function(track, predicate) {
  // Since |track.cues| can be null if |track.mode| is "disabled", force it to
  // something other than "disabled".
  //
  // If the track is already showing, then we should keep it as showing. But if
  // it something else, we will use hidden so that we don't "flash" cues on the
  // screen.
  let oldState = track.mode;
  let tempState = oldState == 'showing' ? 'showing' : 'hidden';
  track.mode = tempState;
  goog.asserts.assert(
      track.cues,
      'Cues should be accessible when mode is set to "' + tempState + '".');
  // Go backward so that if a removal is done, it should not cause problems
  // with future indexing. In the case that the underlying implementation
  // returns a copy (and not a shared instance) cache a copy of the tracks.
  let cues = track.cues;
  for (let i = cues.length - 1; i >= 0; i--) {
    let cue = cues[i];
    if (cue && predicate(cue)) {
      track.removeCue(cue);
    }
  }
  track.mode = oldState;
};
/**
 * @const {string}
 * @private
 */
shaka.text.SimpleTextDisplayer.TextTrackLabel_ = 'Shaka Player TextTrack';
} 

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
      .filter(function(track) { return track.type == 'variant'; })
      .sort(function(a, b) { return a.bandwidth - b.bandwidth; })
      .pop();
  console.log('Offline Track bandwidth: ' + found.bandwidth);
  return [ found ];
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
  var manifestUri = window.document.getElementById('asset-uri-input').value;
  var title = window.document.getElementById('asset-title-input').value;

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