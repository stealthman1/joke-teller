const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable-Enable Button
function toogleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        // For this project I used free version fo the API with 
        // limited access to it
        key: 'ad255625c5bc4d1b838f3ea36396bf23', 
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiURL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toogleButton();
    } catch (error) {
        console.log('whoops', error)
    }
}
// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toogleButton);
