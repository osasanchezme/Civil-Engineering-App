/**
* Loads the ribbon
* @returns {HTMLDivElement} Div ribbon containing all the needed elements, also appends itself to the document body
*/
loadRibbon = () => {
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
addGridRibbon = (ribbon) => {
    const gridsDiv = document.createElement("div");
    gridsDiv.className = "ribbon_divs";
    gridsDiv.style.width = "350px";
    gridsDiv.style.height = ribbon.style.height;
    ribbon.appendChild(gridsDiv);

    createGridCreator("x", "addGridxValue", "addGridxBtn", "addGridxSel", gridsDiv, "delGridxBtn");
    gridsDiv.appendChild(document.createElement("br"));
    createGridCreator("y", "addGridyValue", "addGridyBtn", "addGridySel", gridsDiv, "delGridyBtn");

    document.getElementById("addGridxBtn").addEventListener('click', () =>{
        let value = Number(document.getElementById("addGridxValue").value);
        if (isNaN(value)){
            window.alert("Por favor ingresa un número válido!")
        }else {
            if (JSON.parse(localStorage.x_grids).includes(value)){
                window.alert("Ya existe!")
            }else{
                localStorage.x_grids = JSON.stringify(JSON.parse(localStorage.x_grids).concat(value));
                let x = value*Number(localStorage.getItem("x_scale")) + Number(localStorage.getItem("x_orig"));
                drawLine(x, Number(localStorage.getItem("y_orig")), x, 0 + JSON.parse(localStorage.top_space));
                document.getElementById("addGridxValue").value = "";

                let opt = document.createElement("option");
                opt.innerHTML = String(value)
                document.getElementById("addGridxSel").appendChild(opt);
            }
        }
    });

    document.getElementById("addGridyBtn").addEventListener('click', () =>{
        let value = Number(document.getElementById("addGridyValue").value);
        if (isNaN(value)){
            window.alert("Por favor ingresa un número válido!")
        }else {
            if (JSON.parse(localStorage.y_grids).includes(value)){
                window.alert("Ya existe!")
            }else{
                localStorage.y_grids = JSON.stringify(JSON.parse(localStorage.y_grids).concat(value));
                let y = Number(localStorage.getItem("y_orig")) - (value*Number(localStorage.getItem("y_scale")));
                drawLine(Number(localStorage.getItem("x_orig")), y, Number(document.getElementById("myCanvas").width) - Number(localStorage.getItem("x_orig")), y);
                document.getElementById("addGridyValue").value = "";

                let opt = document.createElement("option");
                opt.innerHTML = String(value)
                document.getElementById("addGridySel").appendChild(opt);
            }
        }
    });

    document.getElementById("delGridxBtn").addEventListener('click', () =>{
        let sel_x = document.getElementById("addGridxSel");
        let value = sel_x.options[sel_x.selectedIndex].value;
        if (sel_x.selectedIndex == 0){
            window.alert("Por favor selecciona la linea que deseas borrar.")
        }else{
            let list_x = JSON.parse(localStorage.x_grids);
            list_x.splice(list_x.indexOf(Number(value)),1);
            localStorage.x_grids = JSON.stringify(list_x)
            sel_x.remove(sel_x.selectedIndex);
            redraw();
        }
    })

    document.getElementById("delGridyBtn").addEventListener('click', () =>{
        let sel_y = document.getElementById("addGridySel");
        let value = sel_y.options[sel_y.selectedIndex].value;
        if (sel_y.selectedIndex == 0){
            window.alert("Por favor selecciona la linea que deseas borrar.")
        }else{
            let list_y = JSON.parse(localStorage.y_grids);
            list_y.splice(list_y.indexOf(Number(value)),1);
            localStorage.y_grids = JSON.stringify(list_y)
            sel_y.remove(sel_y.selectedIndex);
            redraw();
        }
    })


    function createGridCreator (labelStr, inputID, buttonID, selectID, gridsDiv, delBtnID) {
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

        inputGrid.addEventListener("keyup", (evt) =>{
            if(evt.key === "Enter"){
                evt.preventDefault();
                btnp.click();
            }
        });

        const list = document.createElement("select");
        list.id = selectID;
        list.style.className = "form-control form-control-sm";
        list.style.width = "100px";
        opt = document.createElement("option");
        opt.innerHTML = "Agregar..."
        list.appendChild(opt);
        gridsDiv.appendChild(list);

        const btnd = document.createElement("button");
        btnd.id = delBtnID;
        btnd.className = "btn btn-primary btn-sm";
        btnd.style.padding = "1px";
        btnd.style.height = "30px";
        btnd.style.width = "30px";
        btnd.innerHTML = "-"
        btnd.style.padding = "0px";
        btnd.style.border = "0px";
        btnd.style.textAlign = "center";
        btnd.style.marginLeft = "10px";
        gridsDiv.appendChild(btnd);
    }
}

/**
 * Adds the scaling ribbon
 * @param {HTMLDivElement} ribbon Div which represents the ribbon
 */
addScaleRibbon = (ribbon) => {
    const scaleDiv = document.createElement("div"); scaleDiv.className = "ribbon_divs"; scaleDiv.style.width = "280px"; scaleDiv.style.height = ribbon.style.height; ribbon.appendChild(scaleDiv);

    createScalers = (titleLabel, inputID, selectUnitsID, buttonID) => {
        
        const title = document.createElement("label"); title.innerHTML = titleLabel; scaleDiv.appendChild(title);

        const inputScale = document.createElement("input"); inputScale.id = inputID; inputScale.style.className = "form-control"; inputScale.type = "text"; inputScale.style.width = "100px"; inputScale.style.marginTop = "10px"; scaleDiv.appendChild(inputScale); scaleDiv.appendChild(inputScale);
        
        const space = document.createElement("label"); space.innerHTML = "\xa0"; scaleDiv.appendChild(space)

        const list = document.createElement("select"); list.id = selectUnitsID; list.style.className = "form-control form-control-sm"; list.style.width = "50px"; let units = ["mm", "cm", "m", "inch", "ft"];
        for (unit in units){
            opt = document.createElement("option");
            opt.innerHTML = units[unit];
            list.appendChild(opt);
        }
        list.selectedIndex = 2; scaleDiv.appendChild(list);
        
        const btnp = document.createElement("button"); btnp.id = buttonID; btnp.className = "btn btn-primary btn-sm"; btnp.style.padding = "3px"; btnp.style.height = "30px"; btnp.style.width = "30px";
        btnp.innerHTML = "+"
        btnp.style.padding = "0px"; btnp.style.border = "0px"; btnp.style.textAlign = "center"; btnp.style.marginLeft = "10px"; btnp.style.marginRight = "6px";
        scaleDiv.appendChild(btnp);

        inputScale.addEventListener("keyup", (evt) =>{
            if (evt.key == "Enter"){
                evt.preventDefault();
                btnp.click();
            }
        })
    }

    createScalers("Escala x:\xa0", "x_scale", "x_units", "addScaleBtn_x");
    createScalers("Escala y:\xa0", "y_scale", "y_units", "addScaleBtn_y");

    document.getElementById("addScaleBtn_x").addEventListener('click', () =>{
        let model_xDim = Number(document.getElementById("x_scale").value);
        if (isNaN(model_xDim)){
            window.alert("Por favor ingresa un número!\n\nEl separador decimal es el punto '.' ")
        }else{
            let x_orig = localStorage.getItem("x_orig");
            let y_orig = localStorage.getItem("y_orig");
            erase(Number(x_orig)-10, Number(y_orig) +15, Number(window.innerWidth), 50);
            drawLine(Number(x_orig), Number(y_orig) + 50, Number(window.innerWidth) - Number(x_orig), Number(y_orig) + 50);
            drawLine(Number(x_orig), Number(y_orig) + 35, Number(x_orig), Number(y_orig) + 65);
            drawLine(Number(window.innerWidth) - Number(x_orig), Number(y_orig) + 35, Number(window.innerWidth) - Number(x_orig), Number(y_orig) + 65);
            let msg = String(model_xDim) + " " + document.getElementById("x_units").value;
            writeText(Number(window.innerWidth)/2, Number(y_orig) + 35, msg, "gray", "20px Comic Sans M");
            localStorage.setItem("x_scale", String((Number(window.innerWidth)-(2*Number(localStorage.getItem("x_orig"))))/model_xDim));
            localStorage.x_dim = String(model_xDim);
            localStorage.x_units = document.getElementById("x_units").value;

            redraw();
        }
    })

    document.getElementById("addScaleBtn_y").addEventListener('click', () =>{
        let model_yDim = Number(document.getElementById("y_scale").value);
        if (isNaN(model_yDim)){
            window.alert("Por favor ingresa un número!\n\nEl separador decimal es el punto '.' ")
        }else{
            let x_orig = localStorage.getItem("x_orig");
            let y_orig = localStorage.getItem("y_orig");
            let space = JSON.parse(localStorage.top_space)
            erase(0, 0, 80, Number(document.getElementById("myCanvas").height));
            drawLine(Number(x_orig) - 50, space, Number(x_orig) - 50, (Number(y_orig) - space)/2 - 20);
            drawLine(Number(x_orig) - 50, Number(y_orig)/2 + 20, Number(x_orig) - 50, Number(y_orig));
            drawLine(Number(x_orig) - 65, space, Number(x_orig) - 35, space);
            drawLine(Number(x_orig) - 65, Number(y_orig), Number(x_orig) - 35, Number(y_orig));
            let msg = String(model_yDim) + " " + document.getElementById("y_units").value;
            writeText(Number(x_orig) - 50, Number(y_orig)/2, msg, "gray", "20px Comic Sans M");
            localStorage.setItem("y_scale", String(Number(localStorage.getItem("y_orig") - JSON.parse(localStorage.top_space))/model_yDim));
            localStorage.y_dim = String(model_yDim);
            localStorage.y_units = document.getElementById("y_units").value;

            redraw();
        }
    })

    // Also add the ability to import different parts of an existant model
    // Delete grids
}

snapCircle = () => {
    x = JSON.parse(localStorage.posCircle)[0]
    y = JSON.parse(localStorage.posCircle)[1]
    if (x != null && y != null){
        drawCircle(Number(x), Number(y), 3)
    }
}

/**
* Updates the coordinates mesage when moving the mouse over the canvas
*/
mousepos = () =>  {
    const canvas = document.getElementById('myCanvas');
    canvas.addEventListener('mousemove', (evt) => {
        let rect = canvas.getBoundingClientRect();
        let x_pos = (evt.clientX - rect.left - Number(localStorage.getItem("x_orig"))) / Number(localStorage.getItem("x_scale"));
        let y_pos = (evt.clientY - rect.top - Number(localStorage.getItem("y_orig"))) * -1 / Number(localStorage.getItem("y_scale"));
        x_pos = getFormatted(x_pos);
        y_pos = getFormatted(y_pos);
        let message = '[' + x_pos + ',' + y_pos + ']';
        document.getElementById("mousePos").innerHTML = message;

        function getFormatted(number){
            nd_int = 1;
            num = parseInt(number);
            while(parseInt(num/10)>0){
                num = parseInt(num/10);
                nd_int +=1;
            }
            return number.toString().substring(0,nd_int+2) 
        }

        // drawCircle(evt.clientX - rect.left, evt.clientY - rect.top, 3)

        let x_grids = JSON.parse(localStorage.x_grids);
        let y_grids = JSON.parse(localStorage.y_grids);
        let x_scale = Number(localStorage.x_scale);
        let y_scale = Number(localStorage.y_scale);
        let x_orig = Number(localStorage.x_orig);
        let y_orig = Number(localStorage.y_orig);

        for (let i = 0; i < x_grids.length; i++) {
            let x = x_grids[i];
            for (let j = 0; j< y_grids.length; j++) {
                let y = y_grids[j];

                let xx = Number(x) * x_scale + x_orig;
                let yy = y_orig - Number(y) * y_scale;
                let x_mouse = evt.clientX - rect.left;
                let y_mouse = evt.clientY - rect.top;
                
                let xls = JSON.parse(localStorage.posCircle)[0]
                let yls = JSON.parse(localStorage.posCircle)[1]

                if (x_mouse >= xx*0.9 && x_mouse <= xx*1.1 && y_mouse >= yy*0.9 && y_mouse <= yy*1.1){
                    if (xls == null && yls == null){
                        localStorage.posCircle = JSON.stringify([xx, yy])
                        snapCircle();
                    }
                    j = y_grids.length + 10;
                    i = x_grids.length + 10;
                }else{
                    redraw();
                    localStorage.posCircle = JSON.stringify([null, null])
                }
            }
            
        }
        // x_grids.forEach(x => {
        //     y_grids.forEach(y =>{
        //         let xx = Number(x) * x_scale + x_orig;
        //         let yy = y_orig - Number(y) * y_scale;
        //         let x_mouse = evt.clientX - rect.left;
        //         let y_mouse = evt.clientY - rect.top;
                
        //         let xls = JSON.parse(localStorage.posCircle)[0]
        //         let yls = JSON.parse(localStorage.posCircle)[1]

        //         if (x_mouse >= xx*0.9 && x_mouse <= xx*1.1 && y_mouse >= yy*0.9 && y_mouse <= yy*1.1){
        //             if (xls == null && yls == null){
        //                 localStorage.posCircle = JSON.stringify([xx, yy])
        //                 snapCircle();
        //             }
        //         }else{
        //             redraw();
        //             localStorage.posCircle = JSON.stringify([null, null])
        //         }
        //     })
        // });

    },false);
}