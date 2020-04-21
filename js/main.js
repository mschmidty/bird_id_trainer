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

document.getElementById("checkAnswers").addEventListener('click', function(e){
  const allCardsSelect = document.getElementsByClassName("bird-options")
  const allCardsValue = document.getElementsByClassName("card")
  for(let i = 0; i<allCardsValue.length; i++){
    console.log(allCardsValue[i].getAttribute('value'))
    console.log(allCardsSelect[i].value)

    let value = allCardsValue[i].getAttribute('value')
    let select = allCardsSelect[i].value

    allCardsValue[i].classList.remove("correct-answer")
    allCardsValue[i].classList.remove("incorrect-answer")

    if(value == select){
      allCardsValue[i].classList.add("correct-answer")
    }else{
      allCardsValue[i].classList.add("incorrect-answer")
    }
  }
  e.preventDefault()
})
