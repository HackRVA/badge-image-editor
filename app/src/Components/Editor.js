import React from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MonacoEditor from 'react-monaco-editor';

class Editor extends React.Component {
    constructor() {
        super()
        this.canvas = "";
        this.ctx = "";
        this.currentX = 0;
        this.currentY = 0;
        this.previousX = 0;
        this.previousY = 0;
        this.dot_flag = false;
        this.flag = false;
        this.strokeColor = "black";
        this.lineWidth = 3;
        this.tempDataPoints = "";
        this.state = {
            datapoints: ""
        }
    }
    componentDidMount = () => {
        this.canvas = this.refs.canvas
        this.ctx = this.canvas.getContext("2d");
    }
    draw = () => {
        this.tempDataPoints += `\t{ ${Math.floor(this.currentX/4)}, ${Math.floor(this.currentY/4)} },\n`;
        this.ctx.beginPath();
        this.ctx.moveTo(this.previousX, this.previousY);
        this.ctx.lineTo(this.currentX, this.currentY);
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.stroke();
        this.ctx.closePath();
    }
    saveData = () => {
        this.setState({
            datapoints: `{\n${this.tempDataPoints.substr(0, this.tempDataPoints.length - 1)}\n};`
        })
    }
    moveMouse = (movement, evt) => {
        if (movement === "down") {
            this.previousX = this.currentX;
            this.previousY = this.previousY;
            this.currentX = evt.clientX - this.canvas.offsetLeft;
            this.currentY = evt.clientY - this.canvas.offsetTop;

            this.flag = true;
            this.dot_flag = true;

            if(this.dot_flag){
                this.ctx.beginPath();
                this.ctx.fillStyle = this.strokeColor;
                this.ctx.fillRect(this.currentX, this.currentY, 3, 3);//paintbrush
                this.ctx.closePath();
                this.dot_flag = false;
            }
        }
        if (movement === "up" || movement === "out") {
            this.flag = false;
        }
        if (movement === "move") {
            if(this.flag){
                this.previousX = this.currentX;
                this.previousY = this.currentY;
                this.currentX = evt.clientX - this.canvas.offsetLeft;
                this.currentY = evt.clientY - this.canvas.offsetTop;
                this.draw();
            }
        }
    }
    render() {
        const {datapoints} = this.state;
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Badge Image Editor</h1>
                <Grid container>
                    <Grid item xs={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <canvas
                            onMouseMove={(evt) => this.moveMouse("move", evt)}
                            onMouseDown={(evt) => this.moveMouse("down", evt)}
                            onMouseUp={(evt) => this.moveMouse("up", evt)}
                            onMouseOut={(evt) => this.moveMouse("out", evt)}
                            ref="canvas"
                            width={512}
                            height={512}
                            style={{ border: '3px solid black'}}>
                        </canvas>
                    </Grid>
                    <Grid item xs={2} style={{display: "flex", justifyContent: 'center', marginTop:"15px"}}>
                        <Button onClick={this.saveData} variant="outlined" color="primary">
                            Export to text editor
                        </Button>
                    </Grid>
                    <Grid item xs={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:"15px" }}>
                        <MonacoEditor
                            width="500"
                            height="550"
                            language="cpp"
                            theme="vs-dark"
                            value={datapoints}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default Editor