fetch("/data/cleaned_list_with_filenames.csv")
  .then((response)=>{
    return response.text()
  })
  .then((data) => {
    const lines = data.trim().split("\n")
    const result = []
    const headers = lines[0].trim().split(",");

    for(let i = 1; i<lines.length; i++){
      let obj = {}
      let currentLine = lines[i].split(",")
      for(let j = 0; j<headers.length; j++){
        obj[headers[j]] = currentLine[j]
      }
      result.push(obj)
    }
    let shuffledResult = shuffle(result).slice(0,8)
    let markup = shuffledResult.map(data =>

      `
      <div class = "card" value="${data.common_name}">
        <div class = "hide-show-el">
          <img src="/images/${data.common_name}.jpg">
          <h2>${data.common_name}</h2>
          <p>${data.species}</p>
        </div>
        <div class="check-if-correct hide-show-el display-none">
          <select name="birdOptions" id="birdOptions" class="bird-options">
            <option value="">--Please choose an option--</option>
          </select>
        </div>
        <audio controls src = "/${data.audio_file_path }" class = "audio-el"></audio>
      </div>
      `

    ).join("")

    document.getElementById("call-list").innerHTML = markup
    return shuffledResult
  }).then((shuffledResult) =>{
    let dropDownOptions = shuffledResult.map(data =>
      `
      <option value = "${data.common_name}">${data.common_name}</option>
      `
    ).join("")
    let dropDowns = document.getElementsByClassName("bird-options")
    for(let i = 0; i<dropDowns.length; i++){
      dropDowns[i].innerHTML += dropDownOptions
    }
    let audio = document.getElementsByClassName("audio-el")
    for(let i = 0; i<audio.length; i++){
      audio[i].currentTime = 2;
    }
    let audioElements = document.getElementsByTagName("audio");

    for(let i = 0; i<audioElements.length; i++){
      audioElements[i].addEventListener('pause', function(){
        audioElements[i].currentTime=2;
      })
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
