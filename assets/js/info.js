// document.querySelectorAll('.reveal-contact').forEach(function(item) {
//     item.addEventListener('click', function(event) {
//         event.preventDefault();
//         var contactDetails = document.getElementById('contact-details');
//         if (contactDetails.classList.contains('visible')) {
//             contactDetails.classList.remove('visible');
//         } else {
//             contactDetails.classList.add('visible');
//         }
//     });
// });

document.getElementById('reveal-contact').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action of the link
    var contactDetails = document.getElementById('contact-details');
    if (contactDetails.classList.contains('visible')) {
        contactDetails.classList.remove('visible');
    } else {
        contactDetails.classList.add('visible');
    }
});