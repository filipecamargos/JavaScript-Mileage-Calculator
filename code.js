$(function() {

    //Validate the States
    //State Begin
    $("#startState").change(function() {
        let stateBegin = $("#startState").val(); //Get the value
        let letters = /^[A-Za-z]+$/;
        if (stateBegin.match(letters) && (stateBegin.length == 2)) {
            var validState = stateBegin.toUpperCase(); //Upcase it
            $("#startState").val(validState); //Set the value to upcase
            $("#startState").css("color", "white")
        } else {
            $("#startState").val('Please Enter as Two Letters Format: "UT"');
            $("#startState").css("color", "red")
        }
    });
    //StateEnd
    $("#endState").change(function() {
        let stateEnd = $("#endState").val(); //Get the value
        let letters = /^[A-Za-z]+$/;
        if (stateEnd.match(letters) && (stateEnd.length == 2)) {
            var validState1 = stateEnd.toUpperCase(); //Upcase it
            $("#endState").val(validState1); //Set the value to upcase
            $("#endState").css("color", "white");
        } else {
            $("#endState").val('Please Enter as Two Letters Format: "UT"');
            $("#endState").css("color", "red");
        }
    });


    $("#request-button").click(function() {


        if (!myForm.checkValidity()) {
            document.getElementById("myForm").reportValidity();
        } else {


            //When the button is clicked the variables are set
            var city1 = $("#startCity").val();
            var state1 = $("#startState").val();
            var city2 = $("#endCity").val();
            var state2 = $("#endState").val();

            //An URL is created
            var url = "http://localhost/cgi-bin/cs213/mileageAjaxJSON?" +
                "startCity=" + city1 +
                "&startState=" + state1 +
                "&endCity=" + city2 +
                "&endState=" + state2;

            console.log(url); //Testing Porpuse

            //Make a request
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //lets parse the file into a object in JavaScript
                    var jasonobj = JSON.parse(this.responseText);
                    //lets have our function that will display
                    display(jasonobj);
                }
            };

            xhr.open("GET", url);
            xhr.send();

        }

    });

    function display(jasonobj) {
        var total = document.getElementById("total");

        //Display the Information
        total.value =
            "The Total Miles From " + jasonobj.trip.startcity + " to " +
            jasonobj.trip.endstate + " is " + jasonobj.trip.miles;

        total.style.fontSize = 18 + "px";
        total.style.fontWeight = "bolder";
        total.style.color = "#0081F8";
    }



});