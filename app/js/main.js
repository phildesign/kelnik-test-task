document.addEventListener('DOMContentLoaded', function () {
	fetch('../api/db.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			createApartments(data.apartments);
		});

	const createApartments = (apartments) => {
		const apartmentsBox = document.querySelector('.apartments__box');
		const btnLoadMore = document.querySelector('.apartments__btn-load-more');
		const filterRoomsBtns = document.querySelectorAll('.filter__room-input');
		const sortByPriceUp = document.querySelector('#sort-by-price-up');
		const sortByPriceDown = document.querySelector('#sort-by-price-down');
		const sortBySquareUp = document.querySelector('#sort-by-square-up');
		const sortBySquareDown = document.querySelector('#sort-by-square-down');
		const sortByFloorUp = document.querySelector('#sort-by-floor-up');
		const sortByFloorDown = document.querySelector('#sort-by-floor-down');
		const apartmentsCol = document.querySelectorAll('.apartments__col');

		const removeActiveClass = () => {
			apartmentsCol.forEach((item) => {
				item.querySelector('.apartments__top-title').classList.remove('is-active');
				item.querySelectorAll('.apartments__top-controls-btn').forEach((item) => {
					item.classList.remove('is-active');
				});
			});
		};

		sortByPriceUp.addEventListener('click', (event) => {
			removeActiveClass();
			event.currentTarget.classList.add('is-active');
			event.currentTarget.parentElement.previousElementSibling.classList.add('is-active');
			sort('up', 'price');
			renderApartments();
		});

		sortByPriceDown.addEventListener('click', (event) => {
			removeActiveClass();
			event.currentTarget.classList.add('is-active');
			event.currentTarget.parentElement.previousElementSibling.classList.add('is-active');
			sort('down', 'price');
			renderApartments();
		});

		sortBySquareUp.addEventListener('click', (event) => {
			removeActiveClass();
			event.currentTarget.classList.add('is-active');
			event.currentTarget.parentElement.previousElementSibling.classList.add('is-active');
			sort('up', 'square');
			renderApartments();
		});

		sortBySquareDown.addEventListener('click', (event) => {
			removeActiveClass();
			event.currentTarget.classList.add('is-active');
			event.currentTarget.parentElement.previousElementSibling.classList.add('is-active');
			sort('down', 'square');
			renderApartments();
		});

		sortByFloorUp.addEventListener('click', (event) => {
			removeActiveClass();
			event.currentTarget.classList.add('is-active');
			event.currentTarget.parentElement.previousElementSibling.classList.add('is-active');
			sort('up', 'floor_current');
			renderApartments();
		});

		sortByFloorDown.addEventListener('click', (event) => {
			removeActiveClass();
			event.currentTarget.classList.add('is-active');
			event.currentTarget.parentElement.previousElementSibling.classList.add('is-active');
			sort('down', 'floor_current');
			renderApartments();
		});

		const sort = (variant, type) => {
			if (variant === 'up') {
				console.log('up');
				apartments.sort((a, b) => a[type] - b[type]);
			} else if (variant === 'down') {
				apartments.sort((a, b) => a[type] - b[type]).reverse();
			}
		};

		let roomCount = 1;
		filterRoomsBtns.forEach((room) => {
			room.addEventListener('click', (event) => {
				switch (+event.target.value) {
					case 1:
						roomCount = 1;
						break;
					case 2:
						roomCount = 2;
						break;
					case 3:
						roomCount = 3;
						break;
					case 4:
						roomCount = 4;
						break;
					default:
						roomCount = 1;
						break;
				}
				renderApartments();
			});
		});

		let sizePack = 5;
		btnLoadMore.addEventListener('click', (event) => {
			sizePack += 20;
			renderApartments();
			if (apartments.length <= 5 || sizePack >= apartments.length) {
				event.target.style.display = 'none';
			}
		});

		const renderApartments = () => {
			apartmentsBox.innerHTML = apartments
				.filter((item) => item.room_count === roomCount)
				.sort((item) => item.price)
				.slice(0, sizePack)
				.map((apartment) => {
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
				})
				.join('');
		};
		renderApartments();
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
