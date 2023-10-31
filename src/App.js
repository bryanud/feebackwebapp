import { useEffect, useState } from 'react';
import CategoryFilter from './category/Category';
import './style.css';
import supabase from './supabase';

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

function Counter() {

  const [count, setCount] = useState(0);

  return (
    <div>
      <span style={{fontSize: '40px'}}>{count}</span>
      <button className='btn btn-large' onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  )
}

function App() {

  const [showForm, setShowForm] = useState(false);
  const [fact, setFact] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCat, setCurrentCat] = useState('all');

  useEffect(function() {
    async function getFact() {
      setIsLoading(true);
      let query = supabase.from('facts').select('*');

      if(currentCat !== 'all'){
        query = query.eq("category", currentCat);
      }

      let { data: facts, error } = await query.order('votesInteresting', {ascending: false}).limit(100);
      console.log(facts);

      if(!error){ setFact(facts)}
      else {alert('Problem getting data')};
      setIsLoading(false);
    }
    getFact();
  }, [currentCat])

  const appTitle = 'Feedback';
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm}/>

      {showForm ? <NewFact setFact={setFact} setShowForm = {setShowForm}/> : null }

      <main>
        
        <CategoryFilter setCurrentCat={setCurrentCat} />
        {isLoading ? <Loader /> : <FactList fact={fact} setFact={setFact}/> }
        
      </main>
    </>
  )
}

function Loader() {
  return (
    <p className='message'>Loading...</p>
  )
}

function Header({showForm, setShowForm}) {
  const appTitle = 'Feedback';

  return (
    <header>
        <div className="logo">
            <img src="logo.png" alt="logo" />
            <h1>{appTitle}</h1>
        </div>
        <button className="btn btn-large btn-open" 
        onClick={() => setShowForm((show) => !show)}>
          {showForm ? 'Close' : 'Share a fact'}
        </button>
    </header>
  )
  
}

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFact({setFact, setShowForm}) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();

    // 2. check if Data is valid
    if (text && isValidHttpUrl(source) && category && text.length <= 200){
      // 3. create a new fact object
      // const NewFact = {
      //   id: Math.round(Math.random() * 10000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };
      setIsUploading(true);
      async function nFact() {
        const {data: newFact, error} = 
          await supabase.from('facts')
          .insert([{text, source, category}])
          .select();
          setIsUploading(false);
      } nFact();
      // 4. Add new fact to the UI.
      { setFact((fact) => [NewFact[0] , ...fact])};
      // 5. reset input fields
      setText('');
      setSource('');
      setCategory('');
      // 6. Close the form
      setShowForm(false);
    };
    
  }

  return (
    <form action="" className='fact-form' onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Share a fact with the world..." 
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled= {isUploading}
      />
        <span>{200 - text.length}</span>
        <input 
          type="text" 
          placeholder="Trustworthy source..." 
          value={source}
          onChange={(e) => setSource(e.target.value)}
          disabled= {isUploading}  
        />
        
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled= {isUploading}
        >
            <option value="">Choose category</option>
            {CATEGORIES.map((cat) => (<option key={cat.name} value={cat.name}>{cat.name.toUpperCase()}</option>))}
        </select>
        <button className="btn btn-large" disabled ={isUploading}>Post</button>
    </form>
  )
  
}
function FactList({fact, setFact}) {

  if(fact.length === 0) {
    return (
    <>
      <p className='message'> No facts on this category yet! Add one.</p>
      <p className='message'>  Add one.</p>
    </>)
  }

  return (
    <section><ul className="fact-list">{
      fact.map((fact) => (
      <Fact key={fact.id} fact={fact} setFact={setFact}/>
      ))
    }</ul>
    <p>There are {fact.length} facts. Add your own.</p>
    </section>
  )
}

function Fact({fact, setFact}) {
  const [isUpdating, setIsUpdating] = useState(false); 

  async function handleVote() {
    setIsUpdating(true);
    const {data: updatedFact, error} = await supabase.from('facts').update
    ({['votesInteresting']:fact['votesInteresting'] + 1 })
    .eq('id', fact.id)
    .select();

    setIsUpdating(false);
    if (!error) {
      setFact((facts) => facts.map((f) => f.id === fact.id ? updatedFact[0] : f))
    }
  }

  return (
    <li  className="fact">
      <p >
          {fact.text}
          <a className="source" href={fact.source} target="_blank">(Source)</a>
          
      </p>
      <span className="tag" style={{backgroundColor: CATEGORIES.find((col) => col.name === fact.category).color }}>{fact.category}</span> 
          
      <div className="v-buttons">
          <button onClick={handleVote} disabled={isUpdating}>👍 {fact.votesInteresting}</button>
          <button>😍 {fact.votesMindblowing}</button>
          <button>⛔ {fact.votesFalse}</button>
      </div>
    </li>
  )
}

export default App;