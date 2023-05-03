// ! ! !
// JavaScript Rascal
// See the README.md for more details
// ! ! !


// Array of products
const products = [
	{
		name: 'Chicken Harness and Leash',
		image: './images/chicken-harness.jpg',
		price: 35.00,
		reviews: {
			avgRating: 1.8,
			count: 59281
		},
		yearPosted: 2009
	},
	{
		name: 'Baguette Pillow',
		image: './images/baguette-pillow.jpg',
		price: 30.00,
		reviews: {
			avgRating: 5,
			count: 291
		},
		yearPosted: 2019
	},
	{
		name: 'The Hen Bag Handbag',
		image: './images/hen-bag.jpg',
		price: 33.00,
		reviews: {
			avgRating: 4.6,
			count: 8032
		},
		yearPosted: 2023
	},
	{
		name: 'Umbrella Hat',
		image: './images/umbrella-hat.jpg',
		price: 9.00,
		reviews: {
			avgRating: 2.3,
			count: 6
		},
		yearPosted: 1999
	}
];


function start() {
	// Run the function to calculate product discounts
	calculateProductDiscounts(products); 	//Possible change of 'products' to product - actually prolly fine
}

// Takes in an array of products objects, calculates the
// discount for each product, and renders the results to the DOM.
function calculateProductDiscounts(arrayOfProducts) {
	// Loop through the array of products
	for (objects of arrayOfProducts) { //!!! trying to change this to a FOR OF
		// "i" just can't find a single product...
		const product = objects; //!!! adjusting the scope of the value stored in the variable that will be used as an argument from here on out to look at objects in array.

		// Calculate the discount for this one product object
		const discount = calculateDiscount(product);

		// Render the product and discount to the DOM
		renderProduct(product, discount); //!!! NOTE: product is original data PRODUCTS. discount is OBJECTS in original data PRODUCTS.
	}
}

// Calculate the discount for a product, 
// based on the average review, the year it was posted, and the price
function calculateDiscount(taco) {//!!! changed parameter to taco so that it doesn't get confused with the variable also named product whaich was initialized as a const.
	// Get a discount percentage, based on the product review
	let reviewDiscount = getReviewDiscount(taco); //!! this goes to discountPercentage cobnditionbal
	
	// Get a discount percentage, based on the year the product was posted
	let yearAdjustment = getYearAdjustment(taco.yearPosted); //!! this goes to discountPercentage cobnditionbal

	// Get a discount percentage, based on the product price
	let priceAdjustment = getPriceAdjustment(taco.price); //!! this goes to discountPercentage cobnditionbal

	// Add all the discount percentages up, to get a total discount percentage
	let discountPercent = reviewDiscount + yearAdjustment + priceAdjustment;

	// The discount cannot be more than 25%, or less that 0% --// chnaged the discount percentages from less than and greater than and flipped them
	if (discountPercent > 0.25) {
		discountPercent = 0.25;
	} else if (discountPercent < 0) {
		discountPercent = 0;
	}

	// Convert the percentage to an actual dollar amount
	let discountAmount = taco.price * discountPercent;

	return discountAmount;
}

// We'll give a bigger discount for lower rated products
function getReviewDiscount(pizza) {
	let totalReviewDiscount;

	// 1, 2, or 3, you can't catch me! //changed the first if statment from a an equalivalnce to a truthy statment
	if (pizza.reviews.avgRating === 5) {
		// perfect rating 🏆, no discount
		totalReviewDiscount = 0;
	}
	else if (pizza.reviews.avgRating > 4.8) {
		totalReviewDiscount =0.05 ;
	}
	 else if (pizza.reviews.avgRating > 4.0) {
		totalReviewDiscount = 0.10;
	}
	 else if (pizza.reviews.avgRating > 3.5) {
		totalReviewDiscount = 0.15;
	}
	else {
		totalReviewDiscount = 0.20;
	}


	// Low rating, few reviews, bigger discount
	if (pizza.reviews.count < 100) {
		totalReviewDiscount += 0.10;
	} 
	return totalReviewDiscount;

	// no discount for you!
}

// Old products get an extra 10% discount
function getYearAdjustment(yearPosted) {
	if (yearPosted < 2010) {
		return 0.10;
	}else{
		return 0;
	}
}

// Expensive products get an extra 8% discount
function getPriceAdjustment(price) {
	if (price > 30) {
		return 0.08;
	}else{
	return 0;
}
}
// Render a <tr> element to the DOM for a product
// NOTE: NO BUGS IN THIS FUNCTION!
function renderProduct(product, discount) {
	$('#content').append(`
		<tr>
			<td><img src="${product.image}" width=100/></td>
			<td>${product.name}</td>
			<td>${product.yearPosted}</td>
			<td>$${product.price.toFixed(2)}</td>
			<td>${product.reviews.avgRating}</td>
			<td>$${discount.toFixed(2)}</td>
		</li>
	`);
}
