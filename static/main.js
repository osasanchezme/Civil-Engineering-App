window.onload = () =>{
    const ribbon = loadRibbon();
    const canvas = loadCanvas(ribbon);
    mousepos();

    // Initializing local storage variables
    localStorage.x_scale = String(1.0)
    localStorage.y_scale = String(1.0)

    localStorage.x_grids = JSON.stringify([])
    localStorage.y_grids = JSON.stringify([])

    localStorage.top_space = JSON.stringify(10)
    localStorage.elements = JSON.stringify([])

    // let x_grids = [200, 400];
    // drawGrids(x_grids);

    redraw();

    document.body.addEventListener('keyup',(evt) => {
        if(evt.key === "Q" || evt.key === "q"){
            evt.preventDefault();
            redraw();
        }
    })
}
