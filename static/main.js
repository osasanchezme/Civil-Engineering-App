window.onload = function(){
    const ribbon = loadRibbon();
    const canvas = loadCanvas(ribbon);
    mousepos();
    localStorage.setItem("x_scale", String(1.0))
    localStorage.setItem("y_scale", String(1.0))
    localStorage.x_grids = JSON.stringify([])
    localStorage.y_grids = JSON.stringify([])
    localStorage.top_space = JSON.stringify(10)
    localStorage.elements = JSON.stringify([])

    // let x_grids = [200, 400];
    // drawGrids(x_grids);
    loadAxis(canvas);

    document.body.addEventListener('keyup',function(evt){
        if(evt.key === "Q" || evt.key === "q"){
            evt.preventDefault();
            redraw();
        }
    })
}
