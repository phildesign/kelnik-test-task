document.addEventListener('DOMContentLoaded', function () {
	fetch('../api/db.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			renderApartment(data.apartments);
		});

	const renderApartment = (apartments) => {
		const apartmentsBox = document.querySelector('.apartments__box');
		apartmentsBox.innerHTML = apartments.slice(1, 6).map((apartment) => {
			return `
		  <div class="apartments__item">
		    <div class="apartments__row">
		      <div class="apartments__col">
		        <img src=${apartment.layout} alt="" class="apartments__item-img">
		      </div>
		      <div class="apartments__col">
		        <div class="apartments__item-text">${apartment.flat}</div>
		      </div>
		      <div class="apartments__col">
		        <div class="apartments__item-text">${apartment.square}</div>
		      </div>
		      <div class="apartments__col">
		        <div class="apartments__item-text">${apartment.floor_current} из ${apartment.floor_count}</div>
		      </div>
		      <div class="apartments__col">
		        <div class="apartments__item-text">${apartment.price}</div>
		      </div>
		    </div>
		  </div>
		`;
		});
	};
});
