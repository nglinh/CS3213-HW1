var black_list = ["is", "the", "of", "and", "as", "a", "after"];
var title = "is the of and as a after"
var titles = ["The Day after Tomorrow", "Fast and Furious", "Man of Steel"];
var keywords = [];

function findKeywords(titleIndex) {
	splittedArray = titles[titleIndex].split(" ");
	for (var i = 0;i<splittedArray.length; i++){
		var dirty = false;
		for( var k in black_list) {
			if (black_list[k] == splittedArray[i].toLowerCase()) {
				dirty = true;
				break;	// what if all words in black list
			}
		}
		if (!dirty) {
			keywords = keywords.concat([[titleIndex,i]]);
		}
	}
}

function printSingleTitle(indexes){
	var j = indexes[1];
	var splittedArray = titles[indexes[0]].split(" ");
	var finalString = "";
	splittedArray[j] = splittedArray[j].toUpperCase();
	while (j - indexes[1] < splittedArray.length){
		var temp = splittedArray[j>=splittedArray.length ? j%splittedArray.length: j];
		if (j != indexes[1]){
			temp = temp.toLowerCase();
		}
		finalString += temp;
		finalString += " ";
		j++;
	}
	console.log(finalString);	
}

function printTitles(){
	for (var i=0;i<keywords.length;i++) {
		printSingleTitle(keywords[i]);
	}
}

function findAllKeywords() {
	for (var i =0;i<titles.length;i++) {
		findKeywords(i);
	}
}

function sortKeywords() {
	keywords.sort(function (a, b) {
		if (titles[a[0]].split(" ")[a[1]] > titles[b[0]].split(" ")[b[1]]){
			return 1;
		}
		else if (titles[a[0]].split(" ")[a[1]]< titles[b[0]].split(" ")[b[1]]) {
			return -1;
		}
		return 0;
	});
}

findAllKeywords();
sortKeywords();
printTitles();