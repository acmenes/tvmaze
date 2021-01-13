/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

// TV Maze Endpoints

// http://api.tvmaze.com/search/shows?q=<search query>
// http://api.tvmaze.com/shows/<show id>/episodes

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
  console.log(res)
  const showData = res.data
  const displayData = JSON.stringify(showData)
  const shows = res.data.map(result => {
    let show = result.show;
    return {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image
    }
  })
  console.log(displayData)
  console.log(shows)
  return shows
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }

  //for the image, use a try catch, if there is no image, then don't run the code
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();
  // const $showEpisodesButton = document.createElement("button")
  // $("episodes-area").append("button")

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above

  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  console.log(res)
  const episodes = res.data.map(episode => {
    return {
      name: episode.name,
      id: episode.id,
      season: episode.season,
      summary: episode.summary
    }
  })
  console.log(episodes)
  return episodes
}
