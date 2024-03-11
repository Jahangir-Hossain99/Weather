		const apiKey = "8f81c9cb40a30f5f846dff821eaac0f5";
		const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
		const searchBox = document.querySelector(".search input");
		const searchBtn = document.querySelector(".search button");
		const weatherIcon = document.querySelector(".weather-icon");
		const defaultCity = "New York";

async function checkWeather(city) {

		const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
			var data = await response.json();
		

		document.querySelector(".city").innerHTML = data.name;
		document.querySelector(".condition").innerHTML = data.weather[0].main
		document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°C";
		document.querySelector(".humidity").innerHTML = data.main.humidity +"%";
		document.querySelector(".wind").innerHTML = data.wind.speed+"km/h";

		switch (data.weather[0].main) {
			case "Clouds":
				weatherIcon.src="images/clouds.png";
				break;

				case "Clear":
				weatherIcon.src="images/clear.png";
				break;

				case "Rain":
				weatherIcon.src="images/rain.png";
				break;	

				case "Drizzle":
				weatherIcon.src="images/drizzle.png";
				break;

			default:
				weatherIcon.src="images/mist.png";
				break;
		}

		
}

	window.onload = () => {
  checkWeather(defaultCity);
  
};

searchBtn.addEventListener("click",()=>{
	checkWeather(searchBox.value);	
});



const weekUrl = "http://api.openweathermap.org/data/2.5/forecast?units=metric&q= ";



async function weekly(city ) {

		 try {
		  
		    const response = await fetch('https://your-cors-proxy.com/http://api.openweathermap.org/data/2.5/forecast?units=metric&q=' + city + `&appid=${apiKey}`);
		
		    if (!response.ok) {
		      throw new Error(`API request failed with status ${response.status}`);
		    }
		var data = await response.json();

		console.log(data);
		

		const view = document.querySelector(".view");
		const elementsToRemove = view.querySelectorAll(".weekDetails");
  		elementsToRemove.forEach(element => element.remove());

		const imageMap = {

		"Clouds" 	: "images/clouds.png",
		"Clear"		: "images/clear.png",
		"Rain"		: "images/rain.png",
		"Drizzle"	: "images/drizzle.png",
		"Mist"		: "images/mist.png"

		};

		const dayArray  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

		

		for (var i = 7;  i <= data.list.length; i=i+8) {
			const dailyData = data.list[i];
			const weatherImage = dailyData.weather[0].main;
			const imageUrl =imageMap[weatherImage];
			


			const weekDetails = document.createElement("div");
			weekDetails.classList.add("weekDetails");

			const date = dailyData.dt_txt.split(" ")[0];
			const day = new Date(date);
			dayName = dayArray[day.getDay()];
			console.log(dayName);
			const temperature = Math.round(dailyData.main.temp) + "°C";

			weekDetails.innerHTML =`<h3>${dayName}</h3>`+`<img src="${imageUrl}" alt="Weather icon" />`+`<h3> ${temperature}</h3>`;
			

			view.appendChild(weekDetails);
		
		}

	
	}

	window.onload = () => {
  weekly(defaultCity);
};

	searchBtn.addEventListener("click",()=>{
 		 weekly(searchBox.value);
});




