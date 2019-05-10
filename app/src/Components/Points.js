function Points() {
    const PointArr = []
    const penUp = () => PointArr.push({x:-128, y: -128})
    const flatten = arr => [].concat.apply([], arr)
    const clean = pointArr => {
        const splitByAxis = (arr, axis) => {
            let tmpArr = [[]];
            let index = 0;
            let lastX;
            for(let i = 0; i < arr.length; i++){
                if(i === 0){
                    lastX = arr[i][axis]
                }
                tmpArr[index] = tmpArr[index] || [];
                tmpArr[index].push(arr[i])
                if(arr[i][axis] === lastX){
                } else {
                    lastX = arr[i][axis];
                    index++
                }
            }
            return tmpArr
        }
        const xPoints = splitByAxis(pointArr, "x").map( x => {
            if(x.length > 2){
                return [x[0], x[x.length -1]]
            }
            return x
        })
        const yPoints = splitByAxis(flatten(xPoints), "y").map( x => {
            if(x.length > 2){
                return [x[0], x[x.length -1]]
            }
            return x
        })
        return flatten(yPoints);
    }
    const format = () => {
        return `{\n${flatten(clean(PointArr)).map(el => `\t{ ${el.x}, ${el.y} },\n`).join('')}\n};`
    }
    const pushPoint = point => {
        PointArr.push(point)
    }
    const pop = () => PointArr.pop()
    const undo = () => {
        if(!PointArr){
            return;
        }
        if(PointArr.length <= 1){
            PointArr[0] = { x: -128, y: -128 }
            return;
        }
        pop();
        if(PointArr[PointArr.length - 1].x === -128 && PointArr[PointArr.length - 1].x === -128 ){
            return;
        }
        undo();
    }
    const getPoints = () => PointArr;
    const parsePoints = str => {
        const parsed = str.split('\n').map(x => x.replace(/\s/g,'')).map(x=> {
            const stripSquigglies = x.replace("{","").replace("}","").split(",").map(x => {
                return x.split(",")
            })
            return {
                x: stripSquigglies[0],
                y: stripSquigglies[1]
            }
        }).filter(x => x.x && x.y).map(x => ({x: Number(x.x[0]), y: Number(x.y[0])}))
        return parsed;
    }

    return{
        penUp,
        pushPoint,
        format,
        undo,
        getPoints,
        parsePoints
    }
}


export default Points();