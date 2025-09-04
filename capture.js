const constraints = { 
    video: true,
    audio: false 
};

const video = document.querySelector('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const context = canvas.getContext('2d');
const gallery = document.getElementById('gallery');

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
        video.play();
    };
})
.catch((err) => {
    console.error(`${err.name}: ${err.message}`);
});

captureButton.addEventListener('click', () => {
    context.drawImage(video, 0, 0, canvas.clientWidth, canvas.clientHeight);
});

imageURL = canvas.toDataURL('image/png');
console.log(imageURL);

const image = document.createElement('img');
image.src = imageURL;
image.width = 160;
gallery.appendChild(image);
