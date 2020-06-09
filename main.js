
fetch("https://api.github.com/users/lujamaharjan")
.then(response => response.json())
.then(data => {
	var introduction = `Hi my name is ${data['name']}. I live in lalitpur, Nepal. ${data['bio']}
						 I have ${data['followers']} followers in github.
						 I am aspiring web and mobile app deveoper.`
	document.getElementById('profile-image').src= data['avatar_url'];
	document.getElementById('aboutp').textContent = introduction;
	document.getElementById('checkme').href = data['html_url']; 
});

/** for pulling repository data from github **/

fetch("https://api.github.com/users/lujamaharjan/repos")
.then(response => response.json())
.then(data => {

		var state = {
			'querySet':data,
			'page': 1,
			'per_page': 6,
		}

		
		fillRepos(state.page);
		var total_Paginators =  Math.ceil(state.querySet.length/state.per_page);
		makePaginatorButtons(total_Paginators);




		//populate the repos from github
		function fillRepos(current_page){
			var current_page = current_page - 1;
			var min_index = current_page * state.per_page;
			var max_index = min_index + state.per_page;
			
			if(max_index > state.querySet.length){
				max_index = state.querySet.length + 1;
			}
			console.log(max_index)
			var current_data = state.querySet.slice(min_index, max_index);

			var repos = "";
			for(var i in current_data){
				repos += `<div class="repo">
				 			<h4>${current_data[i]['name']}</h4>
				 			<p>${current_data[i]['description']}</p>
				 			<h5><i class="fa fa-circle"> </i> ${current_data[i]['language']}
				 			<span><i class="fa fa-star"></i> ${current_data[i]['watchers']}</span></h5>
			 			</div>`;
			}
			document.querySelector("#repoContainer").innerHTML = repos;
		}

		//makes paingator buttons
		function makePaginatorButtons(total_Paginators){
			var pageno = ""
			for(let i=1; i<=total_Paginators; i++){
				pageno += `<button value="${i}" id="page${i}" class="page">${i}</button>`
			}
			document.querySelector("#paginationWrapper").innerHTML = pageno;

			for(let i=1; i<=total_Paginators; i++){
				document.querySelector(`#page${i}`).addEventListener('click', function(){
					fillRepos(i);
					console.log("I am hit" + i);
				})
			}
		}
		
})


