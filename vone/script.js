

const initialFacts = [
    {
      id: 1,
      text: "React is being developed by Meta (formerly facebook)",
      source: "https://opensource.fb.com/",
      category: "technology",
      votesInteresting: 24,
      votesMindblowing: 9,
      votesFalse: 4,
      createdIn: 2021,
    },
    {
      id: 2,
      text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
      source:
        "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
      category: "society",
      votesInteresting: 11,
      votesMindblowing: 2,
      votesFalse: 0,
      createdIn: 2019,
    },
    {
      id: 3,
      text: "Lisbon is the capital of Portugal",
      source: "https://en.wikipedia.org/wiki/Lisbon",
      category: "society",
      votesInteresting: 8,
      votesMindblowing: 3,
      votesFalse: 1,
      createdIn: 2015,
    },
  ];
  
  const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
  ];



// selecting DOM elements
const btn = document.querySelector('.btn-open');
const form = document.querySelector('.fact-form');
const factsList = document.querySelector('.fact-list');

// Toggle from visibility
btn.addEventListener('click', function() {
    if(form.classList.contains('hidden')){
        form.classList.remove('hidden');
        btn.textContent = 'Close';
    } else {
        form.classList.add('hidden');
        btn.textContent = 'Share a fact';
    }
});


// create DOM elements
factsList.innerHTML = "";

// Load data from supabase
loadFacts();
async function loadFacts() {
    const res = await fetch('https://tzrmwbqwkyyzilnmpdns.supabase.co/rest/v1/facts', {
    headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cm13YnF3a3l5emlsbm1wZG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczMzM0MjksImV4cCI6MjAwMjkwOTQyOX0.CuseoJN7p120xtQyk6dDbhBourHUKwutvUjReYTexQo',
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cm13YnF3a3l5emlsbm1wZG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczMzM0MjksImV4cCI6MjAwMjkwOTQyOX0.CuseoJN7p120xtQyk6dDbhBourHUKwutvUjReYTexQo'
    }
});
const data = await res.json();

// const filteredData = data.filter((fact) => fact.category === 'society');

createFactsList(data);
}



// createFactsList(initialFacts);


function createFactsList(dataArray) {
    
    const htmlArr = dataArray.map(
        (fact) => `
            <li class="fact">
            <p >${fact.text}
                <a class="source" 
                href=${fact.source} 
                target="_blank">
                (Source)</a>
                            
            </p>
            <span class="tag" 
            style="background-color: ${ CATEGORIES.find((col) => col.name === fact.category).color }">
            ${fact.category}</span> 
            </li>                

    `);
    const trt = htmlArr.join("");
    factsList.insertAdjacentHTML("afterbegin", trt);


}





[7,8,9,22,-33,22].filter((e) => e>10);
[7,8,9,22,-33,22].find((e) => e>10);



/*
let voteIn = 66;
let vote = 49;
let text = 'hond';

vote = vote + 20 ;
console.log(vote);

console.log(parseInt('24.33cccc'));

function calcFactAge(year){
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    return age;
}

if(voteIn === vote){
    alert('good');
}

let voteFalse = 7;

const totalUpvotes = vote + voteIn;

const mess = 
totalUpvotes > voteFalse 
    ? 'the fact'
    : 'false';

alert(mess);



const test = 'huppin';

const str = `the fact`


// arrow function

const calFact = (year) => {2022-year}


//arrays
const fact = ['Lisbon is the capital of Portugal', 2015, true];


const [textContent, createdIn, sCorrect] = fact;
console.log(text);

const newFact = [...fact, 'society'];
console.log(newFact);

//Objects
const factObj = {
    text: 'Lisbon is the capital of Portugal',
    category: 'society',
    createdIn: 2015,
    isCorrect: true,
    createSum: function() {
        return `the fact ${this.text}`
    }
};

console.log(factObj.text);
console.log(factObj['text']);

const { category, isCorrect } = factObj;


// LOOP 
[2,4,6,8].forEach(function(e) {
    console.log(e);
});

const tiim = [2,4,6,8].map(function(e) {
    return e*10;
})

const tiime = [2,4,6,8].map((e) => e * 10);


const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
  ];

  const allCategories = CATEGORIES.map((e) =>e.name);
  */