document.querySelector('#submit').addEventListener('click',getName)

function getName(){
    const questions = ['q1', 'q2', 'q3', 'q4', 'q5']
    const answers = questions.map(function(question){
        //ensure all the question got checked 
        //endure the array is not empty value 
        const picked = document.querySelector('input[name= "' + question + '"]:checked')
        return picked ? picked.value : ''
    }) 

    console.log(answers)
    //checking if it is empty string
    //stop run if so
    if ( answers.includes('')){
        document.querySelector('#result').innerText = 'Protect your neck'
        return 
    }

    const query = questions
    .map (function (question,index){
        return question + '=' + answers[index]; 
    })
    .join( '&')

    fetch('/api?'+ query)
        .then( res => res.json() )
        .then( data => 
            document.querySelector('#nameFromBackEnd').innerText = data.name
        ) 

}

