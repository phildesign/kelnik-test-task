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
		apartmentsBox.innerHTML = apartments.slice(0, 5).map((apartment) => {
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

	const goTopBtn = document.querySelector('.apartments__btn-go-top');

	const trackScroll = () => {
		let scrolled = window.pageYOffset;

		if (scrolled > 10) {
			goTopBtn.classList.add('is-active');
		}
		if (scrolled < 10) {
			goTopBtn.classList.remove('is-active');
		}
	};

	const backToTop = () => {
		if (window.pageYOffset > 0) {
			window.scrollBy(0, -80);
			setTimeout(backToTop, 10);
		}
	};

	window.addEventListener('scroll', trackScroll);
	goTopBtn.addEventListener('click', backToTop);

	let filterSliderPrice = document.getElementById('filter-slider-price');
	let filterSliderSquare = document.getElementById('filter-slider-square');

	noUiSlider.create(filterSliderPrice, {
		start: [80, 120],
		tooltips: [
			wNumb({ decimals: 1 }), // tooltip with custom formatting
			true, // tooltip with default formatting
		],
		range: {
			min: 0,
			max: 200,
		},
	});

	noUiSlider.create(filterSliderSquare, {
		start: [80, 120],
		tooltips: [
			wNumb({ decimals: 1 }), // tooltip with custom formatting
			true, // tooltip with default formatting
		],
		range: {
			min: 0,
			max: 200,
		},
	});
});
