function removeClass (index, classNames) {
	var current_classes = classNames.split(" "), // change the list into an array
			classes_to_remove = []; // array of classes which are to be removed

	$.each(current_classes, function (index, class_name) {
		// if the classname begins with bg add it to the classes_to_remove array
		if (/screen_bg.*/.test(class_name)) {
			classes_to_remove.push(class_name);
		}
	});
	// turn the array back into a string
	return classes_to_remove.join(" ");
}
