fetch("/data/cleaned_list_with_filenames.csv")
  .then((response)=>{
    return response.text()
  })
  .then((data) => {
    const lines = data.split("\n")
    const result = []
    const headers = lines[0].split(",");

    for(let i = 1; i<lines.length; i++){
      let obj = {}
      let currentLine = lines[i].split(",")
      for(let j = 0; j<headers.length; j++){
        obj[headers[j]] = currentLine[j]
      }
      result.push(obj)
    }
    console.log(shuffle(result).slice(0,8))
    let markup = result.slice(0,8).map(data =>

      `
      <div class = "card">
        <div class = "hide-show-el">
          <h2>${data.common_name}</h2>
          <p>${data.species}</p>
        </div>
        <audio controls src = "/${data.audio_file_path}" class = "audio-el"></audio>
      </div>
      `

    ).join("")

    document.getElementById("call-list").innerHTML = markup
  }).then(function(){
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
  })

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



// Show an element
var show = function (elem) {
	elem.classList.remove('display-none');
};

// Hide an element
var hide = function (elem) {
	elem.classList.add('display-none');
};

function toggleVis(cl){
  let elements = document.getElementsByClassName(cl);
  for(let k=0; k<elements.length; k++){
    elements[k].classList.toggle('display-none')
  }
}
toggleVis("hide-show-el")
