const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramox, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]

function App1() {
  return (
    <div>
      <h1> My Hacker Stories </h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
      <hr />
      <List />
    </div>
  );
}

const App2 = () => {
  return (
    <div>
      <h1> My Hacker Stories </h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
      <hr />
      <List />
    </div>
  );
}

const App = () => (
    <div>
      <h1> My Hacker Stories </h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
      <hr />
      <List />
    </div>
  );

function List2() {
  return list.map(function (item) {
    return (
      <div key={item.objectID}>
        <span> <a href={item.url}>{item.title}</a> </span>
        <span> {item.author} </span>
        <span> {item.num_comments} </span>
        <span> {item.points} </span>
      </div>
    );
  });
}

const List = () => (
  list.map(function (item) {
    return (
      <div key={item.objectID}>
        <span> <a href={item.url}>{item.title}</a> </span>
        <span> {item.author} </span>
        <span> {item.num_comments} </span>
        <span> {item.points} </span>
      </div>
    );
  })
)

export default App;
