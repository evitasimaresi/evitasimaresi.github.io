---
---
// let pathname = window.location.pathname
// console.log("pathname: " + pathname);
// if (pathname != '/'){
//     console.log("not index!");
// } else {
//     console.log("index!");
// }
// window.field = pathname;

if (window.location.pathname != "/") {
    document.addEventListener('DOMContentLoaded', function () {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                const field = this.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
                // console.log("this is the attribute: " + field);
                localStorage.field = field;
                redirectTo("/");
            });
        });
    });
}

function redirectTo(ref) {
    window.location.href = ref;
}