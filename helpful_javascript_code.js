// Copy and paste to console to see what element is clicked:

document.addEventListener('click', function (event) {

	// Don't follow the link
	event.preventDefault();

	// Log the clicked element in the console
	console.log(event.target);

}, false);



// Copy and paste to console to see div what is scrolling:

function findScroller(element) {
    element.onscroll = function() { console.log(element)}

    Array.from(element.children).forEach(findScroller);
}

findScroller(document.body);
