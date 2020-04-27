fetch("/bird_id_trainer/data/cleaned_list_with_filenames.csv")
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
    let markup = result.map(data =>

      `
      <li>
        <input class = "checkbox-filter" type="checkbox" id="${data.common_name.replace(/^\s+|\s+$/g, '')}" name="${data.common_name.replace(/^\s+|\s+$/g, '')}">
        <label for = "${data.common_name.replace(/^\s+|\s+$/g, '')}">${data.common_name}</label>
      </li>
      `

    ).join("")

    document.getElementById("listOfSelections").innerHTML = markup
    //console.log(result)
    return(result)
  }).then(function(data){
    let returnedData;
    document.getElementById("clickSelect").addEventListener('click', function(e){
      let matchValues = getCheckedBoxes()
      returnedData = subsetJsonWithChecked(data, matchValues)

      let markupCards = returnedData.map(data=>
        `
        <div class = "card" value="${data.common_name}">
          <div class = "hide-show-el">
            <img src="/bird_id_trainer/images/${data.common_name}.jpg">
            <h2>${data.common_name}</h2>
            <p>${data.species}</p>
          </div>
          <div class="check-if-correct hide-show-el display-none">
            <select name="birdOptions" id="birdOptions" class="bird-options">
              <option value="">--Please choose an option--</option>
            </select>
          </div>
          <audio controls src = "/bird_id_trainer/${data.audio_file_path }" class = "audio-el"></audio>
        </div>
        `
      ).join('')

      document.getElementById("call-list").innerHTML = markupCards

      let dropDownOptions = returnedData.map(data =>
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
    })
    let audioElements = document.getElementsByTagName("audio");

    for(let i = 0; i<audioElements.length; i++){
      audioElements[i].addEventListener('pause', function(){
        audioElements[i].currentTime=2;
      })
    }


  })

  function getCheckedBoxes(){
    let checkboxes = document.getElementsByClassName("checkbox-filter")
    let checkboxesChecked = [];

    for(let i =0; i<checkboxes.length; i++){
      if(checkboxes[i].checked){
        checkboxesChecked.push(checkboxes[i].name)
      }
    }
    return checkboxesChecked.length>0 ? checkboxesChecked : null;
  }

  function subsetJsonWithChecked(jsonToSubset, arrayOfSubsetValues){
    let checkedData = [];

    for(let i = 0; i<jsonToSubset.length; i++){
      for(let j = 0; j<arrayOfSubsetValues.length; j++){
        if(arrayOfSubsetValues[j] == jsonToSubset[i].common_name){
          checkedData.push(jsonToSubset[i])
        }
      }
    }
    return checkedData.length>0 ? checkedData : null;
  }
