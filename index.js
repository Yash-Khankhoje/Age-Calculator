function Executer(){

    let nameString = '';
    // List of names.
    let name = document.getElementById('name').value;
    let nameList = name.split(',')

    // List of country Ids
    let country = document.getElementById('country').value;
    let countryList = country.split(',')

    for(let i = 0; i < nameList.length; i++){
        if(nameList.length === 1 && nameList[i].length === 0){
            return alert("422 - Unprocessable Entity\n{ 'error: Missing name parameter' }");
        }
        else if(nameList[i].length === 0){
            return alert("422 - Unprocessable Entity\n{ 'error: Invalid name parameter' }");
        }
        else if(countryList.length > 1){
            return alert("500 - Unprocessable Entity\n{ 'error: Something broke!' }")
        }
        else if(nameList.length >= 1000 && nameList[i].length != 0){
            alert("429 - Too Many Requests\n{ 'error: Request Limit Reached' }");

            // Creating a column for api keys.
            let apiCol = document.createElement('div');
            apiCol.setAttribute('class', 'col-12');

            // Creating text box for API key 
            let apiKeyLabel = document.createElement('Label');
            apiKeyLabel.setAttribute('for','apiKey');
            apiKeyLabel.innerHTML = 'API Key';
            let apiKey = document.createElement('input');
        
            apiKey.setAttribute('type', 'text');
            apiKey.setAttribute('id', 'apiKey');
            apiKey.setAttribute('name', 'apiKey');

            let submitButton = document.createElement('button');
            submitButton.setAttribute('id', 'submitButton');
            submitButton.addEventListener('onClick', ()=>{
                var request = new XMLHttpRequest();
                let apiLink = 'https://api.agify.io?name=peter&apikey={'+ document.getElementById('apiKey').value+'}';
                    
                request.open('Get',apiLink,true)
                request.send();
                request.onload = function() {
                    var data = JSON.parse(this.response)
                    if(data.length === 0){
                        return alert('402 - Payment Required\n{"error: Subscription reuired"}');
                    }
                    else{
                        console.log(data);
                        let myOutput = JSON.stringify(data);
                        console.log('myOutput = ', myOutput);
                        let output = document.getElementById('output-box');
                        output.innerHTML=myOutput;
                    }
                }
            })

            apiCol.append(apiKeyLabel, apiKey, submitButton);

            // Inserting the column in row having id 'inputRow'.
            let apiKeyRow = document.getElementById('inputRow');
            apiKeyRow.appendChild(apiCol);
        }
        else if(nameList.length === 1 && nameList[i] != 0 && countryList[i].length === 0){
            var request = new XMLHttpRequest();
                let apiLink = "https://api.agify.io?name="+nameList[i];
                    
                request.open('Get',apiLink,true)
                request.send();
                request.onload = function() {
                    var data = JSON.parse(this.response)
                    console.log(data);
                    let myOutput = JSON.stringify(data);
                    console.log('myOutput = ', myOutput);
                    let output = document.getElementById('output-box');
                    output.innerHTML=myOutput;
                }
        }
        else if(nameList.length === 1 && nameList[i] != 0 && countryList[i].length != 0){
            var request = new XMLHttpRequest();
                let apiLink = "https://api.agify.io?name="+nameList[i]+"&country_id="+countryList[i];

                request.open('Get',apiLink,true)
                request.send();
                request.onload = function() {
                    var data = JSON.parse(this.response)
                    console.log(data);
                    let myOutput = JSON.stringify(data);
                    console.log('myOutput = ', myOutput);
                    let output = document.getElementById('output-box');
                    output.innerHTML=myOutput;
                }
        }
        else if(nameList.length > 1 && nameList.length < 1000 && nameList[i] != 0 && countryList[0].length === 0){
            nameString =nameString + nameList[i]+'&name[]=';

        }
        else if(nameList.length > 1 && nameList.length < 1000 && nameList[i] != 0 && countryList[0].length != 0){
            nameString =nameString + nameList[i]+'&name[]=';
            
        }

    }


    for(let i = 0; i < nameList.length-1; i++){
        if(nameList.length > 1 && nameList.length < 1000 && nameList[i] != 0 && countryList[0].length === 0){
            var request = new XMLHttpRequest();
            let apiLink = "https://api.agify.io?name[]="+nameString.slice(0,-7);

            request.open('Get',apiLink,true)
            request.send();
            request.onload = function() {
                var data = JSON.parse(this.response)
                console.log(data);
                let myOutput = JSON.stringify(data);
                console.log('myOutput = ', myOutput);
                let output = document.getElementById('output-box');
                output.innerHTML=myOutput;
            }
            
            break;
        }

        if(nameList.length > 1 && nameList.length < 1000 && nameList[i] != 0 && countryList[0].length != 0){
            var request = new XMLHttpRequest();
            let apiLink = "https://api.agify.io?name[]="+nameString.slice(0,-7)+"&country_id="+countryList[i];

            request.open('Get',apiLink,true)
            request.send();
            request.onload = function() {
                var data = JSON.parse(this.response)
                console.log(data);
                let myOutput = JSON.stringify(data);
                console.log('myOutput = ', myOutput);
                let output = document.getElementById('output-box');
                output.innerHTML=myOutput;
            }
            
            break;
        }

    }

}