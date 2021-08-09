function loadPage()
{
    //makeNavigationBar();
    
    //var tab = sessionStorage.getItem('TasteBytesAboutUsTab');

    // Show the default tab chosen by the user
    //$('.nav-pills a[href="#' + tab + '"]').tab('show')

    startSpeechRecognition(onSpeechToText);
    startSpeechSynthesis();
}

function onSpeechToText(text)
{
    var speechOutput = document.getElementById("speechOutput");
    speechOutput.innerHTML = text;
}

//function onClickOfficeCollapse()
//{
//    var officeIframe = document.getElementById('officeIframe');

//    if (officeIframe.src.includes('google-maps.html')) {
//        officeIframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6960394003877!2d103.83172211384436!3d1.3590080990088231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1725f6ca4f35%3A0x7ff1fd1b9c84ac7e!2sMidview%20City!5e0!3m2!1sen!2ssg!4v1606301374623!5m2!1sen!2ssg';

        // Prevent the back button from working on iframes
//        officeIframe.contentWindow.location.replace(officeIframe.src);
//    }
//}
