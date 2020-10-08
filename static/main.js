window.onload = function(){
    const ribbon = loadRibbon();
    const canvas = loadCanvas(ribbon);
    mousepos();
    window.localStorage.setItem("x_scale", String(1.0))
    window.localStorage.setItem("y_scale", String(1.0))

    // let x_grids = [200, 400];
    // drawGrids(x_grids);
    loadAxis(canvas);
}
