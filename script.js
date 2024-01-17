const menuBtn = document.querySelector(".menu-btn"),
    container = document.querySelector(".container");

const progressBar = document.querySelector(".bar"),
    progressDot = document.querySelector(".dot"),
    currentTimeEL = document.querySelector(".current-time"),
    DurationEL = document.querySelector(".duration");

// toggle control
menuBtn.addEventListener("click", () => {
    container.classList.toggle("active");
})

let playing = false,
    currentSong = 0,
    shuffle = false,
    repeat = false,
    favorites = [],
    audio = new Audio();

const songs = [
    {
        title: "Run BTS",
        artist: "BTS",
        img_src: "./images/bg-1.jpg",
        src: "./song/1.mp3"
    },
    {
        title: "Black Swan",
        artist: "BTS",
        img_src: "./images/bg-2.jpg",
        src: "./song/2.mp3"
    },
    {
        title: "Dynamite",
        artist: "BTS",
        img_src: "./images/bg-3.jpg",
        src: "./song/3.mp3"
    },
    {
        title: "Mikrokosmos",
        artist: "BTS",
        img_src: "./images/bg-4.jpg",
        src: "./song/4.mp3"
    },
    {
        title: "Spring Day",
        artist: "BTS",
        img_src: "./images/bg-5.jpg",
        src: "./song/5.mp3"
    },
    {
        title: "Blood Sweat & Tears",
        artist: "BTS",
        img_src: "./images/bg-6.jpg",
        src: "./song/6.mp3"
    },
    {
        title: "Butter",
        artist: "BTS",
        img_src: "./images/bg-7.jpg",
        src: "./song/7.mp3"
    },
    {
        title: "Young Forever",
        artist: "BTS",
        img_src: "./images/bg-8.jpg",
        src: "./song/8.mp3"
    },
    {
        title: "Idol",
        artist: "BTS",
        img_src: "./images/bg-9.jpg",
        src: "./song/9.mp3"
    },
    {
        title: "Dynamite",
        artist: "BTS",
        img_src: "./images/bg-3.jpg",
        src: "./song/3.mp3"
    }
];

const playlistContainer = document.querySelector("#playlist"),
    infoWrapper = document.querySelector(".info"),
    coverImage = document.querySelector(".cover-image"),
    currentSongTitle = document.querySelector(".current-song-title"),
    currentFavourite = document.querySelector("#current-favourite");

function init() {
    updatePlaylist(songs);
    loadSong(currentSong);
}
init();

function updatePlaylist(songs) {
    // remove any existing element 
    playlistContainer.innerHTML = "";

    // use for each on songs array
    songs.forEach((song, index) => {

        // extract data1 from song
        const { title, src } = song;

        // check if included in favorites array
        const isFavourite = favorites.includes(index);

        // create a tr to wrapper songs
        const tr = document.createElement("tr");
        tr.classList.add("songs");
        tr.innerHTML = `
            <td class="no">
                <h5>${index + 1}</h5>
            </td>
            <td class="title">
                <h6>${title}</h6>
            </td>
            <td class="length">
            <h5></h5>
            </td>
            <td>
            <i class="fa fa-heart ${isFavourite ? "active" : ""}"></i>
            </td>
        `;

        playlistContainer.appendChild(tr);

        // lets play song when clicked on playlist songs
        tr.addEventListener("click", (e) => {

            // lets add to favorite when clicked on heart
            if (e.target.classList.contains("fa-heart")) {
                addToFavourits(index);
                e.target.classList.toggle("active");
                // if heart clicked just add to favorite don't play 
                return;
            }

            currentSong = index;
            loadSong(currentSong);
            audio.play();
            container.classList.remove("active");
            playPauseBtn.classList.replace("fa-play", "fa-pause");
            playing = true;
        })

        const audioForDuration = new Audio(`data1/${src}`);
        audioForDuration.addEventListener("loadedmetadata", () => {
            const duration = audioForDuration.duration;

            let songDuration = formatTime(duration);
            tr.querySelector(".length h5").innerText = songDuration;
        });
    });
}

function formatTime(time) {
    // formate time like 2:30
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    // add trailing zero if seconds less than 10
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

// lets add audio play functionality 

function loadSong(num) {
    // change all the title and times to current song
    infoWrapper.innerHTML = `
    <h2>${songs[num].title}</h2>
    <h3>${songs[num].artist}</h3>`
    currentSongTitle.innerHTML = songs[num].title;

    // change th cover image
    coverImage.style.backgroundImage = `url(data1/${songs[num].img_src})`;

    // add src of current song to audio variable 
    audio.src = `data1/${songs[num].src}`;

    // if song is in favorite highlight
    if (favorites.includes(num)) {
        currentFavourite.classList.add("active");
    }
    else {
        // if not remove active 
        currentFavourite.classList.remove("active");
    }
}

// lets add play pause next prev functionality
const playPauseBtn = document.querySelector("#playpause"),
    nextBtn = document.querySelector("#next"),
    prevBtn = document.querySelector("#prev");

playPauseBtn.addEventListener("click", () => {
    if (playing) {
        // pause if already playing
        playPauseBtn.classList.replace("fa-pause", "fa-play");
        playing = false;
        audio.pause();
    } else {
        // if not playing play
        playPauseBtn.classList.replace("fa-play", "fa-pause");
        playing = true;
        audio.play();
    }
});

function nextSong() {
    // shuffle when playing next song
    if (shuffle) {
        shuffleFunc();
        loadSong(currentSong);
        // return because we don't want to play next song now
    }

    // if current song is not last in playlist
    if (currentSong < songs.length - 1) {
        // load the next song
        currentSong++;
    } else {
        // else if its last song then play first
        currentSong = 0;
    }

    loadSong(currentSong);
    // after load is song was playing keep playing current too
    // we need to play if playing true so instead of return make next if to else if
    if (playing) {
        audio.play();
    }
}
nextBtn.addEventListener("click", nextSong);

function prevSong() {
    // same on prev songs 
    if (shuffle) {
        shuffleFunc();
        // return because we don't want to play next song now
    }

    // same for prev song if first song playing to last song
    if (currentSong > 0) {
        currentSong--;
    } else {
        currentSong = songs.length - 1;
    }
    loadSong(currentSong);

    // after load is song was playing keep playing current too
    if (playing) {
        audio.play();
    }
}

// songs 1 repeated that means shuffle working
prevBtn.addEventListener("click", prevSong);

function addToFavourits(index) {
    // check if already in favorites then remove
    if (favorites.includes(index)) {
        favorites = favorites.filter((item) => item / index);

        // if current playing song is removed also remove currentfavorite
        currentFavourite.classList.remove("active");
    } else {
        // if not already in favorite add
        favorites.push(index);

        // if coming from current favorite that  is index and current are equals
        if (index === currentSong) {
            currentFavourite.classList.add("active");
        }
    }
    // after adding favorite rerender playlist to show favorites
    updatePlaylist(songs);
}

// also add to favorite current playing song when clicked  heart
currentFavourite.addEventListener("click", () => {
    currentFavourite.classList.toggle("active");
    addToFavourits(currentSong);
})

// lets add shuffle functionality
const shuffleBtn = document.querySelector("#shuffle")
function shuffleSongs() {
    // if shuffle false make it true or vice versa
    shuffle = !shuffle;
    shuffleBtn.classList.toggle("active");
}
shuffleBtn.addEventListener("click", shuffleSongs);

// if shuffle true shuffle songs when playing next or prev
function shuffleFunc() {
    if (shuffle) {
        // select a random song from playlist
        currentSong = Math.floor(Math.random() * songs.length);
    }
    // if shuffle do false do nothing
}

// repeat functionality
const repeatBtn = document.querySelector("#repeat");
function repeatSong() {
    if (repeat === 0) {
        // if repeat id off make it 1 that means repeat current song
        repeat = 1;
        // if repeat on make button active
        repeatBtn.classList.add("active");
    }
    else if (repeat === 1) {
        // if repeat is 1 that is only repeat current song make it 2 that means repeat playlist
        repeat = 2;
        repeatBtn.classList.add("active");
    } else {
        // else turn off repeat
        repeat = 0;
        repeatBtn.classList.remove("active");
    }
}

repeatBtn.addEventListener("click", repeatSong);
// on one click its repeat === 1 on second repeat ===2 on third repeat ===0 and revise

// now if repeat on on audio end
audio.addEventListener("ended", () => {
    if (repeat === 1) {
        // if repeat current song
        // again load current song
        loadSong(currentSong);
        audio.play();
    } else if (repeat === 2) {
        // if repeat playlist
        // play next song
        nextSong();
        audio.play();
    }
    else {
        // if repeat off
        //just play all playlist one time then stop
        if (currentSong === songs.length - 1) {
            // if its last song in playlist stop playing now
            audio.pause();
            playPauseBtn.classList.replace("fa-pause", "fa-play");
            playing = false;
        } else {
            // if not last continue to next
            nextSong();
            audio.play();
        }
    }
});

// progress function
function progress() {
    let { duration, currentTime } = audio;

    // if any one not a number make it 0
    isNaN(duration) ? (duration = 0) : duration;
    isNaN(currentTime) ? (currentTime = 0) : currentTime;

    // update time elements
    currentTimeEL.innerHTML = formatTime(currentTime);
    DurationEL.innerHTML = formatTime(duration);

    // lets move the progress dot
    let progressPercentage = (currentTime / duration) * 100;
    progressDot.style.left = `${progressPercentage}%`;
}

// update progress on audio timeupdate event 
audio.addEventListener("timeupdate", progress);

// change progress when clicked on bar
function setProgress(e) {
    let width = this.clientWidth;
    let clickX = e.offsetX;
    let duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

progressBar.addEventListener("click", setProgress);

// Volume control
var volumeSlider = document.getElementById("volumeSlider");
var muteButton = document.getElementById("muteButton");
var volumeBarContainer = document.querySelector(".volume-bar-container");
var previousVolume = audio.volume;

if (volumeSlider) {
    // If volume slider exists 
    volumeSlider.addEventListener("input", function () {
        // When the volume slider's input changes
        if (audio) {
            // If audio element exists
            audio.volume = volumeSlider.value / 100;
        }
    });
    audio.addEventListener("volumechange", function () {
        // When the volume of the audio changes
        if (volumeSlider) {
            // If volume slider exists
            volumeSlider.value = audio.volume * 100; // Update the volume slider value to reflect the audio volume
        }
    });
}

if (muteButton) {
    // If mute button exists
    muteButton.addEventListener("click", function () {
        // When the mute button is clicked
        if (audio.volume > 0) {
            // If the audio volume is greater than 0
            previousVolume = audio.volume;
            audio.volume = 0;
            muteButton.innerHTML = '<span class="material-icons" style="font-size:17px;">volume_off</span>';
        } else {
            audio.volume = previousVolume;
            muteButton.innerHTML = '<span class="material-icons" style="font-size:17px;">volume_up</span>';
        }
    });
    muteButton.addEventListener("mouseenter", function () {
        // When mouse enters the mute button
        volumeBarContainer.classList.add("active"); // Add active class to the volume bar container
    });

    volumeBarContainer.addEventListener("mouseleave", function () {
        // When mouse leaves the volume bar container
        volumeBarContainer.classList.remove("active"); // Remove active class from the volume bar container
    });
}
