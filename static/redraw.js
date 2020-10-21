redraw = () => {
    // console.log('Redrawing...')
    let canvas = document.getElementById("myCanvas");
    erase(0,0,canvas.width,canvas.height);
    loadAxis(canvas);
    let x_grids = JSON.parse(localStorage.x_grids);
    let y_grids = JSON.parse(localStorage.y_grids);
    drawxGrids(x_grids);
    drawyGrids(y_grids);

    drawScaleAnnotations();
}

/**
* Draws all the grids
*/
drawxGrids = (x_grids) => {
    for(i of x_grids){
        let x = Number(i)*Number(localStorage.getItem("x_scale")) + Number(localStorage.getItem("x_orig"));
        drawLine(x, Number(localStorage.getItem("y_orig")), x, 0 + JSON.parse(localStorage.top_space));
    }
}

drawyGrids = (y_grids) => {
    for(i of y_grids){
        let y = Number(localStorage.getItem("y_orig")) - (Number(i)*Number(localStorage.getItem("y_scale")));
        drawLine(Number(localStorage.getItem("x_orig")), y, Number(document.getElementById("myCanvas").width) - Number(localStorage.getItem("x_orig")), y);
    }
}

drawScaleAnnotations = () => {
    let x_msg = localStorage.x_dim + ' ' + localStorage.x_units;
    let y_msg = localStorage.y_dim + ' ' + localStorage.y_units;

    let x_orig = localStorage.x_orig;
    let y_orig = localStorage.y_orig;
    let space = JSON.parse(localStorage.top_space)

    drawLine(Number(x_orig), Number(y_orig) + 50, Number(window.innerWidth) - Number(x_orig), Number(y_orig) + 50);
    drawLine(Number(x_orig), Number(y_orig) + 35, Number(x_orig), Number(y_orig) + 65);
    drawLine(Number(window.innerWidth) - Number(x_orig), Number(y_orig) + 35, Number(window.innerWidth) - Number(x_orig), Number(y_orig) + 65);
    writeText(Number(window.innerWidth)/2, Number(y_orig) + 35, x_msg, "gray", "20px Comic Sans M");

    drawLine(Number(x_orig) - 50, space, Number(x_orig) - 50, (Number(y_orig) - space)/2 - 20);
    drawLine(Number(x_orig) - 50, Number(y_orig)/2 + 20, Number(x_orig) - 50, Number(y_orig));
    drawLine(Number(x_orig) - 65, space, Number(x_orig) - 35, space);
    drawLine(Number(x_orig) - 65, Number(y_orig), Number(x_orig) - 35, Number(y_orig));
    writeText(Number(x_orig) - 50, Number(y_orig)/2, y_msg, "gray", "20px Comic Sans M");
}