---
---

// First loading all projects in Index with filter if redirecting from another page
if (window.location.pathname == "/") {
    if (localStorage.field) {
        setPosts(getPosts(localStorage.field))
        // console.log("localStorage.field: " + localStorage.field);
        localStorage.removeItem('field');
    } else {
        setPosts(getPosts('all'));
    }
} else {
    let elementsObj = getElementForPost();
    setElements(elementsObj);
}

function getRandomPosts(postsList) {
    for (let i = 0; i < postsList.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [postsList[i], postsList[j]] = [postsList[j], postsList[i]];
    }
    return postsList;
}

function getRandomPostsArray(postCount) {
    let numbers = Array.from({ length: postCount }, (_, i) => i + 1);
    for (let i = 0; i < postCount; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function defineImageSize(imgSurce) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        // console.log(img);
        img.onload = function () {
            let dimensions = { width: this.width, height: this.height };
            // console.log(dimensions);
            let cellSize;
            if (dimensions.height > dimensions.width) {
                // Vertical image
                cellSize = getRandomNumber(2, 4);
                // console.log("Image Vertical")
            } else {
                // Horizontal image
                cellSize = getRandomNumber(4, 8);
                // console.log("Image Horizontal")
            }
            resolve(cellSize);
        };
        img.onerror = function () {
            reject(new Error("Failed to load image on path: " + imgSurce));
        };
        img.src = imgSurce;
    });
}

function placeImg(imgPosition, cellSize, image) {
    let gridCell = document.querySelector(`.grid > div:nth-child(${imgPosition})`);
    if (gridCell) {
        gridCell.style.gridColumn = 'span ' + cellSize;
    }
    gridCell.innerHTML += `<a class="grid-a" href="${image.url}">
                            <figure>
                            <img class="image-in-grid" src="${image.coverPhoto}" alt="this is an image test">
                            <figcaption class="grid-caption" >${image.title}</figcaption>
                            </figure>
                            </a>`;
}

function appendGridCells(grid, numberOfCells) {
    // Generate an array of the specified length
    for (let i = 0; i < numberOfCells; i++) {
        const gridCell = document.createElement('div');
        grid.appendChild(gridCell);
    }
}

function clearGrid() {
    let grid = document.querySelector('.grid');
    while(grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

// For Posts in index
function setPosts(postsList) {
    // This is count the order of the images in the grid
    let imgIndexInGrid = 1;

    let newImgPosition = 0;
    let oldImgPosition = 0;
    let cellsToAppend = 0;
    let postCount = {{ site.posts.size }};

    let orderOfPosts = getRandomPosts(postsList);
    let image = '';
    const grid = document.querySelector('.grid');

    // Iterate over all images
    // -1- Define their sizes
    // -2-  Get their position
    // -3-  Place them in the grid
    for (let i = 0; i < postCount; i++) {
        image = orderOfPosts[i];
        if (image && image.coverPhoto) {
            defineImageSize(image.coverPhoto)
                .then(cellSize => {
                    image = orderOfPosts[i];

                    newImgPosition = getRandomNumber(newImgPosition + 1, newImgPosition + 8);

                    if (newImgPosition < 8) {
                        appendGridCells(grid, newImgPosition);
                    } else {
                        cellsToAppend = newImgPosition - oldImgPosition;
                        appendGridCells(grid, cellsToAppend);
                    };
                    placeImg(newImgPosition, cellSize, image);
                    oldImgPosition = newImgPosition;
                    newImgPosition++;
                })
                .catch(error => {
                    console.error(error);
                });
        } 
        // else {
        //     console.log('Image not defined.')
        // }
    };
};

function getPosts(field) {
    let postsData = [
        {% for post in site.posts %}
        {
        url: "{{ post.url }}",
        title: "{{ post.title | escape }}",
        field: "{{ post.field | escape }}",
        coverPhoto: "{{ post.coverPhoto | escape }}",
        } {% unless forloop.last %}, {% endunless %}
        {% endfor %}
    ];
    if (field === 'all'){
        return postsData;
    }
    let post = postsData.filter(post => post.field === field);
    return post || null;
}

// This always runs because is the navigation menu
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // const field = this.getAttribute('href');
            const field = this.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
            

            let postsList = getPosts(field);
            if (document.querySelector('.grid').firstChild) {
                clearGrid();
            };
            setPosts(postsList);

        });
    });
});


// Code for Elements in individual post
function getElementForPost() {
    const post = document.getElementsByTagName("main");
    const textImages = post[0].querySelectorAll('p, img');
    console.log(textImages);
    // console.log(textImages[3].currentSrc);
    return textImages;

    for (let j = 0; j < textImages.length; j++) {
        // console.log(textImages[j].tagName);
        if (textImages[j].tagName == "P") {
            console.log(j + " Its an " + textImages[j].tagName)
        }
    }
}

function defineCellSizeforText(text) {
    // let cellSize;
    // let dimensions = { width: this.width, height: this.height };
    console.log(text.length);
    return getRandomNumber(4, 8);
}

function placeElements(elementPosition, cellSize, element){
    let gridCell = document.querySelector(`.grid > div:nth-child(${elementPosition})`);
    if (gridCell) {
        gridCell.style.gridColumn = 'span ' + cellSize;
        if (element.tagName == "IMG") {
            gridCell.innerHTML += `<a class="grid-a">
                                    <figure>
                                    <img class="image-in-grid" src="${element.src}" alt="this is an image test">
                                    <figcaption class="grid-caption" >${element.alt}</figcaption>
                                    </figure>
                                    </a>`;
        } else {
            gridCell.innerHTML += `<a class="grid-a">
                                    ${element.innerText}
                                    </a>`;
            
        }

    }
}

function setElements(elementsObj) {
    let newElmPosition = 0;
    let oldElmPosition = 0;
    let cellsToAppend = 0;

    const grid = document.querySelector('.grid');
    // Iterate over all elements
    // -1- Define their sizes
    // -2-  Get their position
    // -3-  Place them in the grid
    for (let i = 0; i < elementsObj.length; i++) {
        if (elementsObj[i].tagName == "IMG") {
           defineImageSize(elementsObj[i].src)
            .then (cellSize => {
                // console.log('Image size: ' + cellSize);
                newElmPosition = getRandomNumber(newElmPosition + 1, newElmPosition + 8);
                if (newElmPosition < 8) {
                    appendGridCells(grid, newElmPosition);
                } else {
                    cellsToAppend = newElmPosition - oldElmPosition;
                    appendGridCells(grid, cellsToAppend);
                };
                placeElements(newElmPosition, cellSize, elementsObj[i]);
                oldElmPosition = newElmPosition;
                newElmPosition++;
            })
            .catch(error => {
                console.error(error);
            })
        } else {
            console.log("element is: " + elementsObj[i].tagName);
            console.log("Cellsize: " + defineCellSizeforText(elementsObj[i].innerText));
            let cellSize = getRandomNumber(4, 8)
            newElmPosition = getRandomNumber(newElmPosition + 1, newElmPosition + 8);
            if (newElmPosition < 8) {
                appendGridCells(grid, newElmPosition);
            } else {
                cellsToAppend = newElmPosition - oldElmPosition;
                appendGridCells(grid, cellsToAppend);
            };
            placeElements(newElmPosition, cellSize, elementsObj[i]);
            oldElmPosition = newElmPosition;
            newElmPosition++;
        }
    }
}

