var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var displayRepos = function(repos, searchTerm){
    //check if api returned any repos
    if (repos.length === 0){
        repoContainerEl.textContent = "No reposistories found.";
        return;
    }

    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++){
        //formating repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //creating container for each repos
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justifiy-space-between align-center"
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append containter
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check to see if repos has issues or not
        if(repos[i].open_issues_count > 0){
            statusEl.innerHTML = "<i class = 'fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class = 'fas fa-check-square status-icon icon-success'></i>";
        }

        
        repoEl.appendChild(statusEl);

        //append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
}

var formSubmitHandler = function(event){
    event.preventDefault();

    //get value from input element
    var username = nameInputEl.value.trim();

    if (username){
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a Github username");
    }
};
var getUserRepos =function(user){
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    var response = fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayRepos(data,user);
            });
        } else {
            alert("Error: GitHub User Not found");
        }
    })
    .catch(function(error){
        // notice this function is getting chained onto the end of the .then method
        alert("Unable to connect to github");
    });
};

userFormEl.addEventListener("submit", formSubmitHandler);