const api_key = "7e77ad7122084e44c9f199b92007daeb";
var baseURL = "https://api.themoviedb.org/3/";
var searchURL = "search/movie?api_key=";

/*  since we're saving information for a predefined user, we can use local storage
    to store the ID's of movies which this user owns
 */
var myStorage = window.localStorage;
var tempArr = [];
tempArr[0] = "-1";
//initializes the localStorage key 'movies' if it doesn't already exist
if(myStorage.getItem("movies") == null){
    console.log("Creating movies object in localstorage");
    myStorage.setItem("movies", JSON.stringify(tempArr));
}

//this array will store the 10(or less) movie id's from current page
var tempMovieIDArray = [];

function searchMovie(keyword){
    /*Concatenate the url with desired search keyword, then send a request to get
      the JSON object*/
    let url = "".concat(baseURL, searchURL, api_key, "&query=", keyword);
    fetch(url).then(result=>result.json())
    .then((data)=>{
        var table = document.getElementById("movieTable");
        /* If there are existing rows in the table(i.e. the user searches "Deadpool" and then
           searches "Ocean's") then visually remove the pre-existing rows in the table so only
           only the most recent search's data will show 
        */
        while(table.rows.length > 1){
            table.deleteRow(1);
        }

        var total_results = data["total_results"];
        document.getElementById("totalResults").innerHTML = `Search returned: ${total_results} results`;
        
        //if search returns less than 10 results, set max = total_results
        var max = 10;
        if(total_results < max){
            max = total_results;
        }

        /*  Using the returned JSON object, get the first 10 movie titles, 
            release dates, and overviews
        */
        for(var i = 0; i < max; i++){
            //store these 10(or less) movie ID's in our temporary movie array
            var movieID = data["results"][i]["id"];
            tempMovieIDArray[i] = movieID;
            
            //create table rows [Checkbox(Does user own movie?) | Movie Title | Release Date | Overview]
            var row = table.insertRow(i+1);
            var checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.name = "movieCheckBox";
            var isOwnedCell = row.insertCell(0);
            var titleCell = row.insertCell(1);
            var releaseDateCell = row.insertCell(2);
            var overviewCell = row.insertCell(3);
            var movieTitleData = data["results"][i]["title"];
            var releaseDateData = data["results"][i]["release_date"];
            var overviewData = data["results"][i]["overview"];

            /*  if the current movie's id is in local storage, this movie is owned,
                so we want the checkbox to appear as checked off*/
            var retrievedData = myStorage.getItem("movies");
            var movies2 = JSON.parse(retrievedData);
            if(movies2.includes(movieID)){
                checkBox.checked = true;
            }
            
            isOwnedCell.appendChild(checkBox);
            titleCell.innerHTML = movieTitleData;
            releaseDateCell.innerHTML = releaseDateData;
            overviewCell.innerHTML = overviewData;
        }
        console.log(tempMovieIDArray);
        console.log(JSON.parse(myStorage.getItem("movies")));
    })
}

//function to save whether the user owns/doesn't own a movie
function saveMovies(){
    //load the saved IDs as a string from localStorage
    var temp = myStorage.getItem("movies");
    savedMovies = JSON.parse(temp);

    var table = document.getElementById("movieTable");
    var tableLength = table.rows.length;
    /*  if the length of the table is 1, it isn't populated and there's nothing to save
        otherwise, continue saving */
    if(tableLength > 1){
        for(var i = 1; i < tableLength; i++){
            var checkBox = table.rows[i].cells[0].children[0];
            /*  since we're starting at i=1 when iterating through table, we
                use i-1 for the index of the temporary movie array*/
            var currID = tempMovieIDArray[i-1]

            //if a checkbox is marked and the ID isn't already in myStorage, add ID
            if(checkBox.checked && !(savedMovies.includes(currID))){
                savedMovies.push(currID);
            }

            //if checkbox isn't marked but the ID is in myStorage, remove the ID
            else if(!checkBox.checked && savedMovies.includes(currID)){
                //get index of ID we want to remove in savedMovies
                var index = savedMovies.indexOf(currID);
                savedMovies.splice(index, 1);
            }
        }
    }
    /*  save the updated movieID's in local storage & alert user that the changes have
        been saved*/
    myStorage.setItem("movies", JSON.stringify(savedMovies));
    alert("Changes saved!!");
}

/*  Function to toggle between select all or deselect all.
    Function works by storing all checkboxes in a variable (allBoxes),
    then setting each box's checked attribute to match the attribute of 
    'source' which is the 'selectAll' checkbox.
*/
function selectAll(source){
    var allBoxes = document.getElementsByName("movieCheckBox");
    for(var i = 0; i < allBoxes.length; i++){
        allBoxes[i].checked = source.checked;
    }
}