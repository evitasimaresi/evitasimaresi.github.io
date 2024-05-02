---
---
var searchIndex = [
    {% for post in site.posts %}
      {
        title: "{{ post.title | escape }}",
        field: "{{ post.field | escape }}",
        coverPhoto: "{{ post.coverPhoto | escape }}",
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];


console.log(searchIndex[0].coverPhoto);














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

function placeImg(imgPosition, cellSize, imageSrc) {

    let gridCell = document.querySelector(`.grid > div:nth-child(${imgPosition})`);
    if (gridCell) {
        gridCell.style.gridColumn = 'span ' + cellSize;
    }
    gridCell.innerHTML += `<article>
                            <img class="image-in-grid" src="${imageSrc}" alt="this is an image test">
                            <p>image</p>
                            </article>`;
}

function appendGridCells(grid, numberOfCells) {
    // Generate an array of the specified length
    for (let i = 0; i < numberOfCells; i++) {
        const gridCell = document.createElement('div');
        grid.appendChild(gridCell);
    }
}

function setPosts() {
    // This is count the order of the images in the grid
    let imgIndexInGrid = 1;

    let newImgPosition = 0;
    let oldImgPosition = 0;
    let cellsToAppend = 0;
    let postCount = {{ site.posts.size }};

    let orderOfPosts = getRandomPostsArray(postCount);
    let imageSrc = '/assets/images/project-test/WeedingInGasStation_Greece_2012.webp';
    const grid = document.querySelector('.grid');

    // Iterate over all images
    // -1- Define their sizes
    // -2-  Get their position
    // -3-  Place them in the grid
    for (let i = 1; i <= postCount; i++) {
        defineImageSize(imageSrc)
            .then(cellSize => {

                newImgPosition = getRandomNumber(newImgPosition + 1, newImgPosition + 8);
                
                if (newImgPosition < 8) {
                    appendGridCells(grid, newImgPosition);
                } else {
                    cellsToAppend = newImgPosition - oldImgPosition;
                    appendGridCells(grid, cellsToAppend);
                };
                placeImg(newImgPosition, cellSize, imageSrc);
                oldImgPosition = newImgPosition;
                newImgPosition ++;
            })
            .catch(error => {
                console.error(error);
            });
    };
};

setPosts();
// Dynamically follow the resizing of screen's width 
// window.addEventListener('resize', function () {
//     getGridSize();
// });

