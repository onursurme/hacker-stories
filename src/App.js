import { useState } from "react";

const App = () => {
  const stories = [
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
  ];

  const handleSearch = event => {
    console.log(event.target.value);
  }

  return (
    <div>
      <h1> My Hacker Stories </h1>

      <Search onSearch={handleSearch} /> {/* yani App diyor ki bir event olursa benim şu handlerıma haber ver */}

      <hr />
      <Buu abc={stories} /> {/*Buu diye bir component türü tanımladım, bu türde bir component oluşturuyorum ve abc diye bir custom HTML attribute'ü oluşturuyorum, ve datamı bu attribute'e JSX ile değer olarak atıyorum. Burada stories props oluyor (properties demek), yani App componentinden Buu componentine props ile değişken geçirmiş oluyoruz.*/}
    </div>
  );
}

const Search = props => {
  const [searchTerm, setSearchTerm] = useState(''); // React yazmadan useState yazınca da oluyor

  const handleChange = event => {
    //console.log(event.target.value);
    setSearchTerm(event.target.value);
    props.onSearch(event);
  }

  return (
    <div>
      <label htmlFor="search">Search: </label> {/*normalde bir label'la bir inputun eşleşmesi için label'a for attribute'ü verilir. JSX'te for yerine htmlFor var*/}
      <input id="search" type="text" onChange={handleChange} />
      <p>Searching for <strong>{searchTerm}</strong></p>
    </div>
  );
}

const Buu = pp => // function component'lerin ilk argümanları props olur
  pp.abc.map(item => (
    <div key={item.objectID}>
      <span> <a href={item.url}>{item.title}</a> </span>
      <span> {item.author} </span>
      <span> {item.num_comments} </span>
      <span> {item.points} </span>
    </div>
  ));

export default App;
