function getResult(){
    var inputTextArea = document.getElementById("input");
    var outputTextArea = document.getElementById("output");
    var lines = textarea.split("\n");
    
    for(var line in lines){
        outputTextArea.value += line;       
    }
}    

var dataStorage = (function () {

  // privates

	var keywordTable = [[0,1],[2,2]]; 
	var blackList = ["is", "the", "off", "and", "as", "a", "after"];
	var titles = ["The day after tomorrow", "I am a Shrek", "Fast and Furious"];


  	function addEntry(title_index, kw_index) {
   		keywordTable.push([title_index, kw_index])
  	}

  	// Return an object exposed to the public
  	return { 


    	// Add items to our basket
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
    	addKeyword: addEntry,
    	addTitles: function (titleList) {
    		for (var title in titleList){
    			titles.push(title);
    		}
    	},
    	// Get the count of iis tems in the basket
		getCount: function () {
    		return keywordTable.length;
	    },
	    print: function () {
	    	console.log("KeywordTable:\n")
	    	for (var i=0; i<keywordTable.length; i++){
	    		console.log(keywordTable[i][0] + " " + keywordTable[i][1] + "\n");
	    	}
	    }


  };
}());
	
	
	dataStorage.print();
	console.log(dataStorage.getKeywords());