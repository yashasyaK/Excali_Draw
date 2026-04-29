let canvas=document.getElementById('canvas')
let ctx=canvas.getContext('2d');
let color=document.querySelectorAll('.color');
let clear=document.querySelector('#clear')
let undo=document.getElementById('undo')
let redo=document.getElementById('redo');
let thickness=document.getElementById('volume')
let idx=0;

let imageData=[];

let LineThickness=3;



// console.log("hi",imageData);

canvas.width=600;
canvas.height=400;

// console.log(ctx);

imageData.push(ctx.getImageData(0,0,canvas.width,canvas.height))




let isDrawing=false;
let currentcolor='black';

//pc
canvas.addEventListener('mousedown',start);
canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mouseup',stop);

//mobile
canvas.addEventListener('touchstart',start);
canvas.addEventListener('touchmove',draw);
canvas.addEventListener('touchend',stop);


function start(e){
    isDrawing=true;
    const rect = canvas.getBoundingClientRect();
    console.log(rect,rect.left,rect.top);
    ctx.beginPath();
    console.log(e.clientX,e.clientY)
    ctx.moveTo(e.clientX-rect.left,e.clientY-rect.top);
}


function draw(e){
    if(!isDrawing)return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX-rect.left,e.clientY-rect.top);
    ctx.lineWidth=LineThickness
    ctx.lineCap='round'

    ctx.lineJoin='round';
    ctx.strokeStyle=currentcolor;
    ctx.stroke();
}

function stop(e){
    isDrawing=false;

    // imageData.push(ctx.im)
    
    let image=ctx.getImageData(0,0,canvas.width,canvas.height)
    // RemoveUndefined()
    if(image){
        console.log(image,"first")
       if(idx+1 < imageData.length-2){
          imageData.insert(idx+1,image);
       } 
        
       else{
        imageData.push(image);
       }

       idx=idx+1;
    }
    
    // RemoveUndefined()

    console.log(imageData,idx)
}

function RemoveUndefined(){
    console.log(imageData.length);
    for(let i=0;i<imageData.length;i++){
        if(imageData[i]===undefined){
            delete imageData[i]; 
            console.log('removed');
        }  
    }
}

for(let i=0;i<color.length;i++){
    color[i].addEventListener('click',(e)=>{
        currentcolor=(color[i].id);
    })
}


clear.addEventListener('click',()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})


undo.addEventListener('click',(e)=>{
    // RemoveUndefined() 
    if(idx>=0){
         
       let image=imageData[idx-1];

        

          idx=idx-1;
          image=imageData[idx];
          console.log(idx,"idx")
             
        ctx.putImageData(image, 0, 0);
        
        
       
       
    } console.log(imageData)
   
})
redo.addEventListener('click',(e)=>{
    RemoveUndefined()
    if(idx<imageData.length){
       
          image=imageData[idx];
          idx++;
          console.log(idx,"idx")
             
        ctx.putImageData(image, 0, 0);
        
    }
})

thickness.addEventListener('change',(e)=>{
    LineThickness=(e.target.value);
})