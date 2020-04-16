document.getElementById("toggleHeaders").addEventListener('click', function(e){
  toggleVis("hide-show-el")
  e.preventDefault();
})
document.getElementById("mixUp").addEventListener('click', function(e){
  e.preventDefault();
  console.log("clicked");
  let elements = document.querySelectorAll('.card')
  for(let i=0; i<elements.length; i++){
    document.getElementById("call-list").appendChild(elements[Math.random() * i | 0])
  }
})
let audio = document.getElementsByClassName("audio-el")
for(let i = 0; i<audio.length; i++){
  audio[i].currentTime = 2;
}

function shuffle(array){
  let arrayLength = array.length, temp, index;
  while(arrayLength >0){
    index = Math.floor(Math.random()*arrayLength)
    arrayLength--
    temp = array[arrayLength]
    array[arrayLength] = array[index]
    array[index] = temp
  }
  return array;
}

function toggleVis(cl){
  let elements = document.getElementsByClassName(cl);
  for(let k=0; k<elements.length; k++){
    elements[k].classList.toggle('display-none')
  }
}
