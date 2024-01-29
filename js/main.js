(() => {
    
    //Variables
    const characterBox = document.querySelector("#character-box");
    const movieBox = document.querySelector(".movie-box-information");
    const closeMovie = document.querySelector("#close");
    const preLoadText = document.querySelector("#pre-load-text");

    const loadingbox = document.querySelector("#loading-box");
    const loadingbox2 = document.querySelector("#loading-box-2");

    const reviewTemplate = document.querySelector("#review-template");
    const reviewCon = document.querySelector("#review-con");
    const baseUrl = `https://swapi.dev/api/`
    let spinner = `<img src="images/chewie.svg" alt="loading icon" class="spinner">`

    //Make first ajax call

    function getMovies(){
        loadingSpinner()
        fetch(`${baseUrl}/people`)
        .then(response => response.json())
        .then( function(response){
            const characters = response.results;
            const ul = document.createElement("ul");
            characters.forEach((character) =>{
                loadingbox.classList.add("hidden");
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.textContent = character["name"];

                const listOfFilms = character["films"];

                if ((listOfFilms.length) > 3){
                    a.dataset.listOfFilms = listOfFilms[3];
                } else{
                    a.dataset.listOfFilms = listOfFilms[listOfFilms.length - 1];
                }

                li.appendChild(a);
                ul.appendChild(li);
            })
            characterBox.appendChild(ul);

 
        })
        .then(function (){
            const links = document.querySelectorAll("#character-box li a");
            links.forEach(link =>{
                link.addEventListener("click", getReview);
            })

        })
        .catch(err =>{
            console.log(err);
            preLoadText.innerHTML = `<img src="images/darth_maul.svg" alt="Darth Maul created by Symbolicons" class="error-image"> <p>Sorry something went wrong</p>`
        })
    }


    function getReview(e){
        loadingSpinnerMovies()
        const reviewID = e.currentTarget.dataset.listOfFilms;
        fetch(`${reviewID}`)
        .then(response => response.json())
        .then(function(response){
            loadingbox2.classList.add("hidden");
            movieBox.style.display = 'block';
            preLoadText.style.display = "none";
            reviewCon.innerHTML="";
            const template = document.importNode(reviewTemplate.content, true);
            const movieTitle = template.querySelector(".movie-title");
            const movieDescription = template.querySelector(".movie-description");
            const image = template.querySelector(".photo-movie");
            const idMovie = response.episode_id;
            movieTitle.innerHTML = response.title;
            movieDescription.innerHTML = response.opening_crawl;
            image.src = `images/image-${idMovie}_etvhva_c_scale,w_1230.jpg`;
            image.srcset = `
            images/image-${idMovie}_etvhva_c_scale,w_375.jpg 375w,
            images/image-${idMovie}_etvhva_c_scale,w_739.jpg 739w,
            images/image-${idMovie}_etvhva_c_scale,w_1004.jpg 1004w,
            images/image-${idMovie}_etvhva_c_scale,w_1230.jpg 1230w`;
            image.alt = response.title;
            
            reviewCon.appendChild(template);

            gsap.fromTo('.movie-title', {
                y: 40,
                opacity: 0,
              },
              {
              delay: 0.5, 
              duration: 1, 
              y: 0,
              opacity: 1,
              ease: 'power2.easeOut',
              stagger: {
                from: 'start', 
                amount: 0.5, 
              },
            })

            gsap.fromTo('.movie-description', {
                y: 40,
                opacity: 0,
              },
              {
              delay: 0.5, 
              duration: 1, 
              y: 0,
              opacity: 1,
              ease: 'power2.easeOut',
              stagger: {
                from: 'start', 
                amount: 0.5, 
              },
            })

            gsap.fromTo('.photo-movie', {
                y: 40,
                opacity: 0,
              },
              {
              delay: 0.5, 
              duration: 1, 
              y: 0,
              opacity: 1,
              ease: 'power2.easeOut',
              stagger: {
                from: 'start', 
                amount: 0.5, 
              },
            })
            
            
        })
        .catch(err =>{
            console.log(err);
            preLoadText.innerHTML = `<img src="images/darth_maul.svg" alt="Darth Maul created by Symbolicons" class="error-image"> <p>Sorry something went wrong</p>`
        })
    }

    function loadingSpinner(){
        loadingbox.innerHTML = spinner;
      }

      function loadingSpinnerMovies(){
        loadingbox2.classList.remove("hidden");
        loadingbox2.classList.add("block");
        loadingbox2.innerHTML = spinner;
      }

    getMovies();
  


      //Function hide Info Movies
      function hideMovie() {
        movieBox.style.display = "none";
        preLoadText.style.display = "block";
      }

    closeMovie.addEventListener("click", hideMovie);

    

})();
