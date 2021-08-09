function startSpeechRecognition(callbackHandler)
{
    // check if speech recognition is available
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    {
        // check if speech synthesis is available
        if ('speechSynthesis' in window)
        {
            // available, show the speech overlay
            var speechOverlay = document.getElementById("speechOverlay");
            speechOverlay.style.visibility = 'visible';
        }
        else
        {
            // not available
            return;
        }
    }
    else
    {
        // not available
        return;
    }

    // speech recognition api
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

    // new speech recognition object
    var recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onspeechend = function() {
        recognition.stop();
    }

    recognition.onaudioend = function() {
        recognition.stop();
    }

    recognition.onsoundend = function() {
        recognition.stop();
    }

    recognition.onend = function() {
        recognition.stop();
        recognition.start();
    }

    recognition.onerror = function() {
        recognition.abort();
        recognition.stop();
    };

    // when the speech recognition returns result ...
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        console.log("speech heard : " + transcript + ",  confidence : " + confidence)
        // accept only results with confidence level over 70%
        //if (confidence >= 0.7) {
        // accept all results here, control what the confidence value to accept at the handler onSpeechToText
        if (confidence >= 0) {
            callbackHandler(transcript, confidence);
        }
    };

    // initial start of speech recognition
    recognition.start();
}

var speakers = [];
var speakerVoice = null;

function startSpeechSynthesis()
{
    // initialize speech synthesis options
    if (sessionStorage.getItem('speechGender') == null)
    {
        var speechGender = Math.floor(Math.random() * 2) == 0 ? 'male' : 'female';
        sessionStorage.setItem('speechGender', speechGender);
    }
    
    var speechIcon = document.getElementById("speechIcon");
    speechIcon.src = 'images/speak-icon-face-left.png';    

    // first try always fail
    var voices = speechSynthesis.getVoices();

    // second try after 100ms timeout
    setTimeout(function() {
        voices = speechSynthesis.getVoices();

        voices.forEach(function(voice)
        {
            if (voice.name.includes('English')) {
                if (voice.name.includes('Microsoft')) {
                    if (voice.name.includes('Zira')) {
                        speakers.push({
                            gender: 'female',
                            name: 'Zira',
                            voice: voice,
                            identifier: voice.name,
                        });
                    }
                }
                else if (voice.name.includes('Male'))
                {
                    speakers.push({
                        gender: 'male',
                        name: 'Peter',
                        voice: voice,
                        identifier: voice.name,
                    });
                }               
            }
        });

        if (speakers.length == 0)
        {
            return;
        }

        if (sessionStorage.getItem('speechSpeaker') != null)
        {
            speakers.forEach(function(speaker) {
                if (speaker.identifier === sessionStorage.getItem('speechSpeaker'))
                {
                    speakerVoice = speaker.voice;
                }
            });

            if (speakerVoice != null)
            {
                return;
            }
        }

        while (speakerVoice == null)
        {
            var speaker = speakers[Math.floor(Math.random() * speakers.length)]
            if (speaker.gender === sessionStorage.getItem('speechGender'))
            {
                sessionStorage.setItem('speechSpeaker', speaker.identifier);
                speakerVoice = speaker.voice;
                return;
            }
        }

        //randomly select one of the voice type
        var speaker = speakers[Math.floor(Math.random() * speakers.length)]
        sessionStorage.setItem('speechSpeaker', speaker.identifier);
        speakerVoice = speaker.voice;

    }, 100);
}

function speechSynthesisSpeak(text)
{
    setTimeout(function() {
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = speakerVoice;
        speechSynthesis.speak(utterance);
    }, 50);
}