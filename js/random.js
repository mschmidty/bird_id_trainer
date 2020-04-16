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
    let markup = shuffle(result).slice(0,8).map(data =>

      `
      <div class = "card">
        <div class = "hide-show-el">
          <img src="/images/${data.common_name}.jpg">
          <h2>${data.common_name}</h2>
          <p>${data.species}</p>
        </div>
        <audio controls src = "/${data.audio_file_path }" class = "audio-el"></audio>
      </div>
      `

    ).join("")

    document.getElementById("call-list").innerHTML = markup
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
