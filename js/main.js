// Houston Bennett
// ASD 1306


$('#homePage').on('pageinit', function(){

    //Will fetch data from storage as soon as there is some to fetch
    getLocal();



});

$('#addNew').on('pageinit', function(){

console.log('addNew page init GOOD');

var addForm = $('#addNewForm');

    addForm.validate({
        invalidHandler: function (form, validator){
            alert('You must have missed a required input. TRY AGAIN!')
        },
        submitHandler: function(){
            console.log('Validation Successful! Serializing form.');
            var formData = addForm.serializeArray();
            console.log('The following is the serialized data: '+ formData);
            console.log('Sending data to storage!');
            storeData();

        }
    });

});



var getLocal = function(){

    if (localStorage.length === 0){

        alert('THERE IS NO DATA IN LOCAL STORAGE!')

    }else{


        var choreDiv = $('#contentDiv');

        for(var i = 0, len = localStorage.length; i< len;i++){
            choreDiv.append('<ul data-role="listview" data-theme="a" id="choreList"></ul>')
            var key = localStorage.key(i),
                localData = localStorage.getItem(key),
                parsedData = JSON.parse(localData),
                choreList = $('#choreList');
            console.log('After parse:' + parsedData);

            $.each(parsedData, function(z, value){
                console.log('Value: ' + value);
                var listItem = value[0]+ ' ' + value[1];

                choreList.append('<li>'+ listItem +'</li>')
            });

            choreList.append("<li><a href='#editChar' data-theme='a' class='editBtn' data-id="+ key +">Edit Item</a></li>");
            choreList.append("<li><a href='#' data-inline='true' data-id="+key+" class = 'delBtn'> Delete Item</a></li>");
            choreList.append("<p></p>");
        }
        //choreList.listview('refresh');

    }


};

var storeData = function(){
    //create unique key
    var itemID = Math.floor(Math.random() * 10001);

    var formData = {};

    formData.who = ["Responsible Party: ", $('#inputWho').val()];
    formData.chore = ["Chore/Bill: ", $('#inputChore').val()];
    formData.due = ["Due Date: ", $('#inputDueDate').val()];
    formData.amount = ["Amount Due: ", $('#inputAmount').val()];
    formData.payto = ["Payable To: ", $('#inputPayable').val()];

    console.log('formData = '+ formData);
    localStorage.setItem(itemID, JSON.stringify(formData));
    alert('Save Complete!');



};