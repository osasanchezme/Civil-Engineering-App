window.onload = function(){
    const ribbon = loadRibbon();
    const canvas = loadCanvas(ribbon);
    mousepos();

    // let x_grids = [200, 400];
    // drawGrids(x_grids);
    loadAxis(canvas);
}
