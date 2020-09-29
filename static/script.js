window.onload = function(){
    const ribbon = loadRibbon();
    const canvas = loadCanvas(ribbon);
    mousepos();

    drawLine(0,0,10,10);
    let x_grids = [200, 400];
    drawGrids(x_grids);
    loadAxis(canvas);
}

/**
* Updates the coordinates mesage when moving the mouse over the canvas
*/
function mousepos() {
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');
    canvas.addEventListener('mousemove', function(evt) {
        var rect = canvas.getBoundingClientRect();
        var message = '[' + parseInt(evt.clientX - rect.left - 100) + ',' + parseInt((evt.clientY - rect.top - canvas.height + 100)*-1) + ']';
        document.getElementById("mousePos").innerHTML = message;
    }, false);
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
 * Pls document 
 */
function writeText(x ,y , content, color = "black", size = "30px Comic Sans M"){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
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
* Loads the ribbon
*/
function loadRibbon(){
    // Create the ribbon
    const ribbon = document.createElement("div");
    ribbon.style.width = String(window.innerWidth) + "px";
    ribbon.style.height = "98px"; // So that after the borders is 100, watch the canvas size!
    ribbon.id = "myRibbon";
    document.body.appendChild(ribbon);

    // Add the mouse position box
    const posInfoDiv = document.createElement("div");
    posInfoDiv.className = "ribbon_divs";
    posInfoDiv.style.width = "100px";
    posInfoDiv.style.height = ribbon.style.height;
    ribbon.appendChild(posInfoDiv);
    const posInfo = document.createElement("label");
    const msg = document.createElement("label");
    msg.innerHTML = "Coordenadas actuales:"
    posInfo.id = "mousePos";
    posInfoDiv.appendChild(msg);
    posInfoDiv.appendChild(document.createElement("br"));
    posInfoDiv.appendChild(posInfo);

    // Add the grids box
    addGridRibbon(ribbon)

    return ribbon;
}

/**
* Loads the canvas
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
* Grid ribbon functionality
*/
function addGridRibbon(ribbon){
    const gridsDiv = document.createElement("div");
    gridsDiv.className = "ribbon_divs";
    gridsDiv.style.width = "300px";
    gridsDiv.style.height = ribbon.style.height;
    ribbon.appendChild(gridsDiv);

    createGridCreator("x", "addGridxValue", "addGridxBtn", "addGridxSel", gridsDiv);
    gridsDiv.appendChild(document.createElement("br"));
    createGridCreator("y", "addGridyValue", "addGridyBtn", "addGridySel", gridsDiv);


    function createGridCreator(labelStr, inputID, buttonID, selectID, gridsDiv){
        const lbl = document.createElement("label");
        lbl.innerHTML = labelStr + "\xa0=\xa0";
        gridsDiv.appendChild(lbl);

        const inputGrid = document.createElement("input");
        inputGrid.id = inputID;
        inputGrid.style.className = "form-control"
        inputGrid.type = "text";
        inputGrid.style.width = "100px"
        inputGrid.style.marginTop = "10px"
        gridsDiv.appendChild(inputGrid);

        const btnp = document.createElement("button");
        btnp.id = buttonID;
        btnp.className = "btn btn-primary btn-sm";
        btnp.style.padding = "3px";
        btnp.style.height = "30px";
        btnp.style.width = "30px";
        btnp.innerHTML = "+"
        btnp.style.padding = "0px";
        btnp.style.border = "0px";
        btnp.style.textAlign = "center";
        btnp.style.marginLeft = "10px";
        btnp.style.marginRight = "20px";
        gridsDiv.appendChild(btnp);

        const list = document.createElement("select");
        list.id = selectID;
        list.style.className = "form-control form-control-sm";
        list.style.width = "100px";
        opt = document.createElement("option");
        opt.innerHTML = "No grid"
        list.appendChild(opt);
        gridsDiv.appendChild(list);
    }
}

function loadAxis(canvas){
    drawLine(100, canvas.height - 100, 150, canvas.height - 100, 2, "green");
    drawLine(100, canvas.height - 100, 100, canvas.height - 150, 2, "red");
    writeText(150 + 10, canvas.height - 100 + 5,"X","black", "20px Comic Sans M");
    writeText(100, canvas.height - 150 - 7 ,"Y","black", "20px Comic Sans M");
}