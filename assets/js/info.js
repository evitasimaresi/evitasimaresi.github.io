document.getElementById('reveal-contact').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action of the link
    var contactDetails = document.getElementById('contact-details');
    var myPhoto = document.getElementsByClassName('my-photo')[0];
    if (contactDetails.classList.contains('visible')) {
        contactDetails.classList.remove('visible');
        myPhoto.classList.remove('hidden');
    } else {
        contactDetails.classList.add('visible');
        myPhoto.classList.add('hidden');
    }
});