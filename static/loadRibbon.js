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

    // Add the scaling box
    addScaleRibbon(ribbon)
    
    // Add the grids box
    addGridRibbon(ribbon)

    return ribbon;
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
        opt.innerHTML = "Agregar..."
        list.appendChild(opt);
        gridsDiv.appendChild(list);
    }
}

/**
 * Adds the scaling ribbon
 * @param {HTMLDivElement} ribbon Div which represents the ribbon
 */
function addScaleRibbon(ribbon){
    const scaleDiv = document.createElement("div");
    scaleDiv.className = "ribbon_divs";
    scaleDiv.style.width = "300px";
    scaleDiv.style.height = ribbon.style.height;
    ribbon.appendChild(scaleDiv);
}

/**
* Updates the coordinates mesage when moving the mouse over the canvas
*/
function mousepos() {
    const canvas = document.getElementById('myCanvas');
    canvas.addEventListener('mousemove', function(evt) {
        let rect = canvas.getBoundingClientRect();
        let message = '[' + parseInt(evt.clientX - rect.left - 100) + ',' + parseInt((evt.clientY - rect.top - canvas.height + 100)*-1) + ']';
        document.getElementById("mousePos").innerHTML = message;
    }, false);
}