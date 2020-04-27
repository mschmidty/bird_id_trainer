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
        <img src="/images/${data.common_name}.jpg">
        <div class = "hide-show-el">
          <h2>${data.common_name}</h2>
          <p>${data.species}</p>
        </div>
        <div class="check-if-correct hide-show-el display-none">
          <select name="birdOptions" id="birdOptions" class="bird-options">
            <option value="">--Please choose an option--</option>
          </select>
        </div>
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
  })
