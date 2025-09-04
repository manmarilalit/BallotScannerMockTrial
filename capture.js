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
        video.muted = true;
        video.play();

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    };
})
.catch((err) => {
    console.error(`${err.name}: ${err.message}`);
});

captureButton.addEventListener('click', () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    imageURL = canvas.toDataURL('image/png');
    console.log(imageURL);

    const image = document.createElement('img');
    image.src = imageURL;
    image.width = 160;
    gallery.appendChild(image);

    let images = JSON.parse(localStorage.getItem('capturedImages')) || [];
    images.push(imageURL);
    localStorage.setItem('capturedImages', JSON.stringify(images));
});

gallery.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        window.location.href = 'confirm.html'; // <- triggers immediately
    }
});


