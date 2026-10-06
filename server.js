const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

//names options
const names = {
    a: {
        first: ['Tiger','Horse','Snake','Ox','Cat' ],
        last: ['Fire','Earth','Water','Golden','Air' ]
    },
    b: {
        first: ['Wood','Aqua','Gemini','Libra','Prodigy' ],
        last: ['Panda','PassionFruit','Leo','Lovelace','Weleda' ]
    },
    c: {
        first: ['Strokes','Shining','Ring','Witch','Magcian' ],
        last: ['Beatles','FireStarter','Saw','Fool','Star' ]
    }
   
}
//we have not create this yet
//randomize the numeber of this 
function listTaker (list) {
    return list[Math.floor(Math.random() * list.length) ]
}

//learning to make counts cunt how many times a,b,c 
//showup and return the highest count wins 
function mostPicked (answered){
    const counts = {
        a:0,
        b:0,
        c:0
    };
    answered.forEach(function(answer){
        if (counts[answer]!== undefined){
            counts[answer] += 1 //counts how many times a,b,c counts in
        }
    } );

    let winner = 'a';
    if (counts.b > counts[winner]) 
      {winner = 'b'}
    if (counts.c > counts[winner])  
      {winner = 'c'}
    return winner;

}

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
    ////add your new page here/////
  } else if ( page == '/api' ){
    //
    // if ('Q1' in params && 'Q2' in params && 'Q3' in params && 'Q4' in params && 'Q5' in params)
    // {
      const answer =[ params.q1, params.q2, params.q3, params.q4, params.q5 ]
      const letter = mostPicked(answer)
      const group = names[letter]
      const name = listTaker(group.first)+ ' ' + listTaker(group.last)

      res.writeHead(200, {'Content-Type': 'application/json'});
      const objToJson = {
        finalNameOutput:name
      }
      res.end(JSON.stringify({name:name}));
    }

  // }

  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(5500);
