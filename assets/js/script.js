---
---
let pathname = window.location.pathname
console.log("pathname: " + pathname);
if (pathname != '/'){
    console.log("not index!");
} else {
    console.log("index!");
}