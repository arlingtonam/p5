function handleCSV() {
  const fileInput = document.getElementById('csvFileInput');
  const file = fileInput.files[0];

  const reader = new FileReader();

  reader.onload = function(event) {
    const fileContent = event.target.result;

    Papa.parse(fileContent, {

      complete: function(results) {
        titlesArr = [];
        results.data.forEach((book) => {
            if(book[18] === 'read'){
                titlesArr.push(book[1])
            }
        });
        redraw();
      },
    });
  };

  reader.readAsText(file);
}

