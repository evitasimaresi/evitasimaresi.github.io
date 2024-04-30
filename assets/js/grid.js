---
---
var postCount = {{ site.posts.size }};

function RandomPostsArray(postCount) {
    var numbers = Array.from({ length: postCount }, (_, i) => i + 1);
    for (var i = 0; i < postCount; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    console.log("numbers: " + numbers);
}

RandomPostsArray(postCount);


// choose random number from 0 to 2 and set cells
// function chooseCells() {
//     var cellIndex = Math.floor(Math.random() * 3);
//     console.log("cellIndex: " + cellIndex);

//     var gridCells = document.querySelectorAll('.grid div');

//     if (cellIndex >= 0 && cellIndex < gridCells.length) {
//         var selectedCell = gridCells[cellIndex];
//         selectedCell.innerHTML += '.selected/ ';
//         for (let i = 1; i <= cellIndex; i++) {
//             var selectedCell = gridCells[cellIndex + i];
//             selectedCell.innerHTML += '.selected/ ';
//         }
//     } else {
//         console.error('Cell index out of bounds');
//     }
// }

function chooseCells() {
    var cellIndex = Math.floor(Math.random() * 3) + 1;
    console.log("cellIndex: " + cellIndex);

    var gridCell = document.querySelector(`.grid > div:nth-child(${cellIndex})`);
    if (gridCell) {
        gridCell.style.gridColumn = 'span ' + cellIndex;
    }
    gridCell.innerHTML += '.selected/ ';
}

function getGridSize() {
    var defaultScreenWidth = [900, 1200];
    var gridColumnCount = 48;
    var screenWidth = window.innerWidth;

    if (screenWidth <= defaultScreenWidth[0]) {
        gridColumnCount = gridColumnCount / 4;
    } else if (screenWidth <= defaultScreenWidth[1]) {
        gridColumnCount = gridColumnCount / 2;
    }
    console.log("gridColumnCount: " + gridColumnCount);
    return gridColumnCount;
}

function SetPositionForPosts() {
    var initialPosition = chooseCells();
    var orderOfPosts = RandomPostsArray();

}

chooseCells();
// Dynamically follow the resizing of screen's width 
window.addEventListener('resize', function () {
    getGridSize();
});

