/**
* Loads the canvas
* @param {HTMLDivElement} ribbon Div which represents the ribbon
* @returns {HTMLCanvasElement} A canvas that will be the drawing area
*/
function loadCanvas(ribbon){
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = Number(window.innerHeight) - Number(ribbon.style.height.substring(0,2));
    canvas.id = "myCanvas";
    document.body.appendChild(canvas);
    return canvas;
}

/**
* Draws a line between the given points
* @param  {Number} xi x-coord initial point
* @param  {Number} yi y-coord initial point
* @param  {Number} xj x-coord end point
* @param  {Number} yj y-coord end point
* @param  {Number} linewidth Line Width desired
* @param  {String} color color desired for the line
*/
function drawLine(xi, yi, xj, yj, linewidth = 0.5, color = "black"){
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(parseInt(xi), parseInt(yi));
    ctx.lineTo(parseInt(xj), parseInt(yj));
    ctx.lineWidth = linewidth;
    ctx.strokeStyle = color;
    ctx.stroke();
    // Save each line that is drawn or find a way to get all the drawn lines info
}

/**
 * Writes text with given params in the given coords
 * @param {Number} x x-coord (canvas-relative) in which to place the text
 * @param {Number} y y-coord (canvas-relative) in which to place the text
 * @param {string} content Text content
 * @param {String} color Desired color for the text. Default: "black"
 * @param {String} size Desired style for the text. Default: "30px Comic Sans M"
 */
function writeText(x ,y , content, color = "black", size = "30px Comic Sans M"){
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    ctx.font = size;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(content, x, y);
}

/**
* Draws all the grids
*/
function drawGrids(x_grids){
    for(i of x_grids){
        drawLine(parseInt(i), 0, parseInt(i), 600);
    }
}

/**
 * Draws the axis on the canvas
 * @param {HTMLCanvasElement} canvas Element in which to place the axis
 */
function loadAxis(canvas){
    let x_org = 100; // Distance from the left in px
    let y_org = 100; // Distance from the bottom in px
    window.localStorage.setItem("x_orig", x_org)
    window.localStorage.setItem("y_orig", Number(canvas.height) - y_org)
    drawLine(x_org, canvas.height - y_org, x_org + 50, canvas.height - y_org, 2, "green");
    drawLine(x_org, canvas.height - y_org, x_org, canvas.height - y_org - 50, 2, "red");
    writeText(150 + 10, canvas.height - 100 + 5,"X","black", "20px Comic Sans M");
    writeText(100, canvas.height - 150 - 7 ,"Y","black", "20px Comic Sans M");
}