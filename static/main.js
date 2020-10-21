window.onload = () =>{
// Initializing local storage variables
    localStorage.x_scale = String(1.0)
    localStorage.y_scale = String(1.0)

    localStorage.x_grids = JSON.stringify([])
    localStorage.y_grids = JSON.stringify([])

    localStorage.top_space = JSON.stringify(10)
    localStorage.elements = JSON.stringify([])

    localStorage.posCircle = JSON.stringify([null, null]);

    const ribbon = loadRibbon();
    const canvas = loadCanvas(ribbon);
    mousepos();

    // let x_grids = [200, 400];
    // drawGrids(x_grids);

    redraw();

    document.body.addEventListener('keyup',(evt) => {
        if(evt.key === "Q" || evt.key === "q"){
            evt.preventDefault();
            redraw();
        }
    })

    document.body.addEventListener('keyup',(evt) => {
        if(evt.key === "C" || evt.key === "c"){
            evt.preventDefault();
            snapCircle();
        }
    })
}
