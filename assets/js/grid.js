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

// function defineImageSize(img, min, max) {
//     if (min & max){
//         return getRandomNumber(min, max);
//     }

//     if (!img.height) {
//         const image = new Image();
//         image.onload = function() {
//         console.log(this.width + 'x' + this.height);
//         }
//         image.src = img;
//     }

//     if (img.height > img.width) {
//         // Vertical image
//         return getRandomNumber(3, 5);
//     }
//     // Horizontal image
//     return getRandomNumber(5, 7);
// }

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

async function defineImageSize(imgSrc, min, max) {
    if (min && max) {
        console.log(imgSrc);
        return getRandomNumber(min, max);
    }
    const Min = 3;
    const Mid = 5;
    const Max = 7;

    if (imgSrc.height && imgSrc.width) {
        if (imgSrc.height > imgSrc.width) {
                    // Vertical image
                    return getRandomNumber(Min, Mid);
                }
                // Horizontal image
                return getRandomNumber(Mid, Max);   
    }

    try {
        const image = await loadImage(imgSrc);
        // console.log(image.width + 'x' + image.height);

        let size;
        if (image.height > image.width) {
            // Vertical image
            size = getRandomNumber(Min, Mid);
        } else {
            // Horizontal image
            size = getRandomNumber(Mid, Max);
        }

        return size;
    } catch (error) {
        console.error('Error loading image:', error);
        // Handle error appropriately
        return null;
    }
}

function placeImg(imgPosition, cellSize, image) {
    let embedSrc;
    let gridCell = document.querySelector(`.grid > div:nth-child(${imgPosition})`);
    if (gridCell) {
        gridCell.style.gridColumn = 'span ' + cellSize;
    }
    
    if (image.coverPhoto.includes('youtube.com')) {
        embedSrc = `<div class="iframe-wrapper">
        <iframe src="${image.coverPhoto}" frameborder="0"></iframe>
        </div>`;
        
    } else {
        embedSrc = `<img class="image-in-grid" src="${image.coverPhoto}" alt="${image.title}"></img>`;
    }

    gridCell.innerHTML += `<a class="grid-a" href="${image.url}"><figure>${embedSrc}<figcaption class="grid-caption">${image.title}</figcaption></figure></a>`;
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

async  function setPosts(postsList) {
    // This is count the order of the images in the grid
    let imgIndexInGrid = 1;

    let newImgPosition = 0;
    let oldImgPosition = 0;
    let cellsToAppend = 0;
    let postCount = {{ site.posts.size }};
    let cellSize;

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
            cellSize = await defineImageSize(image.coverPhoto)
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
        } 
    };
    // deleteEmptyCells(grid);
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
    // const textImages = post[0].querySelectorAll('p, img');
    const textImages = post[0].getElementsByClassName("post-items");
    return textImages[0].children;
}

function placeElements(elementPosition, cellSize, element){
    // console.log(element.src);
    let gridCell = document.querySelector(`.grid > div:nth-child(${elementPosition})`);
    if (gridCell) {
        gridCell.style.gridColumn = 'span ' + cellSize;
        if (element.tagName == "IMG") {
            gridCell.innerHTML += `<a class="grid-a">
            <figure>
            <img class="image-in-grid" src="${element.src}" alt="${element.alt}">
            <figcaption class="grid-caption" >${element.alt}</figcaption>
            </figure>
            </a>`;
        } else if (element.tagName == "P") {
            element.classList.add("grid-a");
            gridCell.innerHTML += element.outerHTML;
            
        } else {
            // gridCell.innerHTML += element.outerHTML;
            gridCell.innerHTML += `<div class="iframe-wrapper">
                                    <iframe src="${element.src}" frameborder="0"></iframe>
                                    </div>`;

        }

    }
}

async function setElements(elementsObj) {
    let newElmPosition = 0;
    let oldElmPosition = 0;
    let cellsToAppend = 0;

    let cellSize;

    const grid = document.querySelector('.grid');
    // Iterate over all elements
    // -1- Define their sizes
    // -2-  Get their position
    // -3-  Place them in the grid
    for (let i = 0; i < elementsObj.length; i++) {
        // console.log(i + ": width is: " + elementsObj[i].width);
        if (elementsObj[i].tagName == "IMG") {
            cellSize = await defineImageSize(elementsObj[i]);
        } else if (elementsObj[i].tagName == "IFRAME") {
            cellSize = await defineImageSize(elementsObj[i], 10, 13);
        }
        else {
            cellSize = getRandomNumber(7, 11);
        }
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
