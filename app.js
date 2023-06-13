const $gifContainer = $("#gifContainer");
const $searchForm = $("#searchForm");

function giphyAdd(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100"
    });
    $newCol.append($newGif);
    $gifContainer.append($newCol);
  }
}

$searchForm.on("submit", async function(e) {
  e.preventDefault();

  let searchTerm = $("#search").val();
  $("#search").val("");

  const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }
  });
  giphyAdd(response.data);
});

$("#remove-btn").on("click", function() {
  $gifContainer.empty();
});
