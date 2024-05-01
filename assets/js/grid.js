---
---
function getRandomPostsArray(postCount) {
    let numbers = Array.from({ length: postCount }, (_, i) => i + 1);
    for (let i = 0; i < postCount; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    // console.log("numbers: " + numbers);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function defineImageSize(imgSurce) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function () {
            let dimensions = { width: this.width, height: this.height };
            // console.log("imageDimensions: ", dimensions);
            let cellSize;
            if (dimensions.height > dimensions.width) {
                // console.log("vertical")
                // Vertical image
                cellSize = getRandomNumber(2, 4);
            } else {
                // console.log("horizontal")
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
    const cellsArray = Array.from({ length: numberOfCells }, (_, i) => i + 1);
    cellsArray.forEach(cell => {
        const gridCell = document.createElement('div');

        grid.appendChild(gridCell);
    });
}

function setPosts() {
    // This is count the order of the images in the grid
    let imgIndexInGrid = 1;

    let imgPosition = 0;
    console.log("0: imgPosition: " + imgPosition);
    let postCount = {{ site.posts.size }};

    let orderOfPosts = getRandomPostsArray(postCount);
    let imageSrc = '/assets/images/project-test/WeedingInGasStation_Greece_2012.webp';
    const grid = document.querySelector('.grid');

    // Iterate over all images
    // -1- Define their sizes
    // -2-  Get their position
    // -3-  Place them in the grid
    for (let i = 1; i <= postCount; i++) {
        // console.log("postCount: " + postCount);
        defineImageSize(imageSrc)
            .then(cellSize => {
                // console.log("Cell size: ", cellSize);

                imgPosition = getRandomNumber(imgPosition + 1, imgPosition + 8);
                console.log(i + ": imgPosition: " + imgPosition);
                if (imgPosition <= 8) {
                    appendGridCells(grid, imgPosition + cellSize);
                } else {
                    appendGridCells(grid, cellSize + 1);
                };
                
                placeImg(imgPosition, cellSize, imageSrc);
                imgPosition++;
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

