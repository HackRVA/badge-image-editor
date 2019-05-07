import React from 'react'
import Grid from '@material-ui/core/Grid';
import MonacoEditor from 'react-monaco-editor';

class Editor extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div> 
                <h1 style={{textAlign:'center'}}>Badge Image Editor</h1>
                <Grid container>
                    <Grid item xs={6} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <canvas ref="canvas" width={512} height={512} style={{border: '3px solid black'}}></canvas>
                    </Grid>
                    <Grid item xs={6} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <MonacoEditor
                            width="500"
                            height="550"
                            language="cpp"
                            theme="vs-dark"
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default Editor