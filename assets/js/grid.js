---
---

// First loading all projects
setPosts(getPosts(''));

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
        img.onload = function () {
            let dimensions = { width: this.width, height: this.height };
            let cellSize;
            if (dimensions.height > dimensions.width) {
                // Vertical image
                cellSize = getRandomNumber(2, 4);
            } else {
                // Horizontal image
                cellSize = getRandomNumber(4, 8);
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
                            <article>
                            <img class="image-in-grid" src="${image.coverPhoto}" alt="this is an image test">
                            <p class="grid-p" >${image.title}</p>
                            </article>
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

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const field = this.getAttribute('href');

            let postsList = getPosts(field);
            if (document.querySelector('.grid').firstChild) {
                clearGrid();
            };
            setPosts(postsList);

        });
    });
});

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
if (field === ''){
return postsData;
}
let post = postsData.filter(post => post.field === field);
return post || null;
}
