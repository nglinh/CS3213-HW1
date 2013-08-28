function getResult(){
    var inputTextArea = document.getElementById("input");
    var outputTextArea = document.getElementById("output");
    var lines = textarea.split("\n");
    
    for(var line in lines){
        outputTextArea.value += line;       
    }
}    
