var myIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("slides-background");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 6000); // Change image every 2 seconds
}

const tabs = document.querySelectorAll('.tabs-bottoms')
const tabNum = tabs.length;
const transitionTime = 6000;

function CreateTimeout($tab, time, $beforeTab) {
	return setTimeout (()=>{
		if($beforeTab){
			$beforeTab.classList.remove('is-animated')
		}
		if (time === (tabNum - 1) * transitionTime) {
			setTimeout(()=>{
				tabs[tabNum - 1].classList.remove('is-animated');
				animationLoop()
			},transitionTime)
		}
	$tab.classList.add('is-animated') 
	}, time)
	// body...
}

function animationLoop (){
	tabs.forEach(($tab, index)=>{
		const time = index * transitionTime;
		CreateTimeout($tab, time, tabs[index-1])
		})
	
}
animationLoop();

const publicKey = "f4626e8b42c139552674cc5299c83d80";
const privateKey = "84ebff5eaa5bcb67157ac385cc55e3e915e5a32f";

const content = document.getElementById('video-container');
const comiContent = document.getElementById('comicContent');


const getConnection = ()=> {
	const ts = Date.now ();
	const hash = md5(ts + privateKey + publicKey);
	const url =  `http://gateway.marvel.com/v1/public/creators/32/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
	const BASE_API = 'https://gateway.marvel.com/v1/public/';
	const fetchuno =`${BASE_API}creators/32/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
	const fetchdos =`${BASE_API}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

	fetch(fetchuno)
	.then(response => response.json())
	.then(response =>{
		console.log(response);
        response.data.results.forEach(hero =>{
          drawHero(hero);
        });
      })
    .catch(hero => console.log(hero));

	fetch(fetchdos)
	.then(response => response.json())
	.then(response =>{
		console.log(response);
		 response.data.results.forEach(comic =>{
          drawComic(comic);
        });
      })
    .catch(comic => console.log(hero));
}

const drawComic = comic => {
  const images = `${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`;
  const comicInfo =`
    <div class ="video-item">
		<img class="image-hover" src="${images}" width="200" height="200" id="image-change">
		<h3 class="titulo">${comic.name}</h3>
    </div>
  `;
  comiContent.insertAdjacentHTML('beforeEnd', comicInfo);
};

// function changeImage (comic){
// 	const imageChange = document.getElementById('image-change');
// 	const characterChange = document.getElementById('character-change');
// 	return{
// 		imageChange.addEventListener('click', (event)=>{
// 		const images = `${comic.thumbnail.path}/landscape_incredible.${comic.thumbnail.extension}`;
// 		const character =`
//     	<div class ="v">
// 			<img src="${images}" width="650" height="406">
//     	</div>
// 		`;
// 		})
// 	}
// }

const drawHero = hero => {
  const image = `${hero.thumbnail.path}/portrait_uncanny.${hero.thumbnail.extension}`;
  const heroes =`
    <div class="new-week-item">
		<img src="${image}" width="183" height="274">
		<h3>${hero.title}</h3>
		<p>${hero.variantDescription}</p>
		<a href="${hero.urls[0].url}" target="_blank">Encuentrame aqui</a>
		<p> $${hero.prices[0].price}</p>
	</div>
  `;
  content.insertAdjacentHTML('beforeEnd', heroes);
};


getConnection();



