//Const program

const decreaseBtn=document.getElementById('decreaseBtn');
const resetBtn=document.getElementById('resetBtn');
const increaseBtn=document.getElementById('increaseBtn');
const countLabel= document.getElementById('countLabel');
const amin = document.getElementById('amin');
let count=0;

increaseBtn.onclick=function(){
    count++;
    countLabel.textContent=count;
    if(count==30){
        amin.textContent="Amin!";
    }else if(count==31){
        amin.textContent="";
    }
}
decreaseBtn.onclick=function(){
    count--;
    countLabel.textContent=count;
}
resetBtn.onclick=function(){
    count=0;
    countLabel.textContent=count;
}