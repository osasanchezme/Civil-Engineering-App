function redraw(){
    let canvas = document.getElementById("myCanvas");
    erase(0,0,canvas.width,canvas.height);
    loadAxis(canvas);
    let x_grids = JSON.parse(localStorage.x_grids);
    drawxGrids(x_grids);
}

/**
* Draws all the grids
*/
function drawxGrids(x_grids){
    for(i of x_grids){
        let x = Number(i)*Number(localStorage.getItem("x_scale")) + Number(localStorage.getItem("x_orig"));
        drawLine(x, Number(localStorage.getItem("y_orig")), x, 0 + JSON.parse(localStorage.top_space));
        // let y = Number(localStorage.getItem("y_orig")) - (value*Number(localStorage.getItem("y_scale")));
        //         drawLine(Number(localStorage.getItem("x_orig")), y, Number(document.getElementById("myCanvas").width) - Number(localStorage.getItem("x_orig")), y);
    }
}

// function drawyGrids(y_grids){
//     for(i of x_grids){
//         drawLine(parseInt(i), 0, parseInt(i), 600);
//     }
// }