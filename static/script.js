window.onload = function(){
    const ribbon = loadRibbon();
    const canvas = loadCanvas(ribbon);
    mousepos();

    // let x_grids = [200, 400];
    // drawGrids(x_grids);
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
 * Writes text with given params in the given coords
 * @param {Number} x x-coord (canvas-relative) in which to place the text
 * @param {Number} y y-coord (canvas-relative) in which to place the text
 * @param {string} content Text content
 * @param {String} color Desired color for the text. Default: "black"
 * @param {String} size Desired style for the text. Default: "30px Comic Sans M"
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
* @returns {HTMLDivElement} Div ribbon containing all the needed elements, also appends itself to the document body
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
* Grid section in the main Ribbon
* @param {HTMLDivElement} ribbon Div which represents the ribbon
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

    document.getElementById("addGridxBtn").addEventListener('click', function(){
        let value = Number(document.getElementById("addGridxValue").value);
        if (isNaN(value)){
            window.alert("Por favor ingresa un número válido!")
        }else {
            let x = value + Number(window.localStorage.getItem("x_orig"));
            drawLine(x, Number(document.getElementById("myCanvas").height), x, 0);
        }
    });

    document.getElementById("addGridyBtn").addEventListener('click', function(){
        let value = Number(document.getElementById("addGridyValue").value);
        if (isNaN(value)){
            window.alert("Por favor ingresa un número válido!")
        }else {
            // let y = Number(document.getElementById("myCanvas").height) - Number(window.localStorage.getItem("y_orig")) - value;
            let y = Number(window.localStorage.getItem("y_orig")) - value;
            drawLine(0, y, Number(document.getElementById("myCanvas").width), y);
        }
    });


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
        opt.innerHTML = "Agregando..."
        list.appendChild(opt);
        gridsDiv.appendChild(list);
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