fetch("data/cleaned_list_with_filenames.csv")
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
    console.log(result)
    let markup = result.map(data =>

      `
      <div class = "card">
        <h2>${data.common_name}</h2>
        <p>${data.species}</p>
        <audio controls src = "/${data.audio_file_path}"></audio>
      </div>
      `

    ).join("")

    document.getElementById("call-list").innerHTML = markup
  })
