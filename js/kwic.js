var dataStorage = (function () {

  // privates

  var keywordTable = []; 
  var blackList = [];
  var titles = [];
  var cirlcularShift = [];


  function addEntry(title_index, kw_index) {
  	keywordTable.push([title_index, kw_index])
  }

  	// Return an object exposed to the public
  	return { 
  		clear: function() {
  			keywordTable = []; 
  			blackList = [];
  			titles = [];
  			cirlcularShift = [];
  		},
  		setBlackList: function(new_black_list) {
  			this.blackList = new_black_list;
  		},
  		addBlacklistEntry: function(ignored_word) {
  			blackList.push(ignored_word);
  		},

  		getBlackList: function(){
  			return blackList;
  		},

  		addPermutation: function(shifted_title) {
  			cirlcularShift.push(shifted_title);
  		},
  		getPermutations: function() {
  			return cirlcularShift;
  		},
    	// Add items to our basket

    	getKeywordsIndexes: function() {
    		return keywordTable;
    	},

    	getKeywords : function() {
    		var result = [];
    		var titleIndex, wordIndex, words;

    		for(var i=0; i<keywordTable.length; i++){
    			titleIndex = keywordTable[i][0];
    			wordIndex = keywordTable[i][1];
    			words = titles[titleIndex].split(" ");
    			result.push(words[wordIndex]) 
    		}
    		return result;
    	},
    	getTitles: function() {
    		return titles;
    	},
    	addKeyword: addEntry,
    	addTitles: function (title_list) {
    		for (var titleIndex in title_list){
    			titles.push(title_list[titleIndex]);
    		}
    	},
    };
}());

var inputProcessor = (function() {
	function processBlackList() {
		var inputContent = document.getElementById('black_list');
		var black_list = inputContent.value.trim().replace(/\s+/g,' ').split(' '); //remove extra spaces
		for (var i = 0;i<black_list.length; i++){
			dataStorage.addBlacklistEntry(black_list[i]);
		}
	}
	function processTitles() {
		var inputContent = document.getElementById('input');
		var titles = inputContent.value.trim().split('\n');
		for (var i =0;i<titles.length;i++){
			titles[i] = titles[i].replace(/\s+/g,' ');	//remove extra spaces in titles
		}
		dataStorage.addTitles(titles);
	}
	return {
		process: function() {
			processBlackList();
			processTitles();
		}
	}
})();

var outputProcessor = (function() {
	return {
		output: function() {
			var result = '';
			for (var i=0;i<dataStorage.getPermutations().length;i++) {
				result += dataStorage.getPermutations()[i];
				result += '\n';
			}
			document.getElementById('output').value = result;
		}
	}
})();

var keywordFinder = (function() {
	function findKeywords(titleIndex) {
		splittedArray = dataStorage.getTitles()[titleIndex].split(' ');
		for (var i = 0;i<splittedArray.length; i++){
			var dirty = false;
			for( var k in dataStorage.getBlackList()) {
				if (dataStorage.getBlackList()[k] == splittedArray[i].toLowerCase()) {
					dirty = true;
					break;	// what if all words in black list
				}
			}
			if (!dirty) {
				dataStorage.addKeyword(titleIndex,i);
			}
		}	
	}
	return {
		findAllKeywords: function() {
			for (var i =0;i<dataStorage.getTitles().length;i++) {
				findKeywords(i); 	
			}
		}
	};
}
)();

var alphabetizer = (function () {
	return {
		sortKeywords: function() {
			dataStorage.getKeywordsIndexes().sort(function (a, b) {
				if (dataStorage.getTitles()[a[0]].split(" ")[a[1]] > dataStorage.getTitles()[b[0]].split(" ")[b[1]]){
					return 1;
				}
				else if (dataStorage.getTitles()[a[0]].split(" ")[a[1]]< dataStorage.getTitles()[b[0]].split(" ")[b[1]]) {
					return -1;
				}
				return 0;
			});
		}
	}
})();

var cirlcularShift = (function () {
	function shiftSingleTitle(indexes) {	//general format for indexes is [title_index, keyword_index]
		var titles = dataStorage.getTitles();
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
		dataStorage.addPermutation(finalString);
	}
	return {
		shiftTitles: function() {
			for (var i =0;i<dataStorage.getKeywordsIndexes().length;i++){
				shiftSingleTitle(dataStorage.getKeywordsIndexes()[i]);
			}
		}
	}
})();

var main = function() {
	dataStorage.clear();		//make sure datastorage is clean before executing
	inputProcessor.process();
	keywordFinder.findAllKeywords();
	alphabetizer.sortKeywords();
	cirlcularShift.shiftTitles();
	outputProcessor.output();
};


