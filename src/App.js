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

  const [searchTerm, setSearchTerm] = useState('React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const searchedStories1 = stories.filter(function (story) {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const searchedStories2 = stories.filter(story => {
    return story.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
  const searchedStories = stories.filter(story =>  // filter'a argüman olarak boolean return eden bir fonksiyon verilir
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1> My Hacker Stories </h1>

      <Search search={searchTerm} onSearch={handleSearch} /> {/* yani App diyor ki bir event olursa benim şu handlerıma haber ver */}

      <hr />
      <Buu abc={searchedStories} /> {/*Buu diye bir component türü tanımladım, bu türde bir component oluşturuyorum ve abc diye bir custom HTML attribute'ü oluşturuyorum, ve datamı bu attribute'e JSX ile değer olarak atıyorum. Burada stories props oluyor (properties demek), yani App componentinden Buu componentine props ile değişken geçirmiş oluyoruz.*/}
    </div>
  );
}

const Search = props => (
    <div>
      <label htmlFor="search">Search: </label> {/*normalde bir label'la bir inputun eşleşmesi için label'a for attribute'ü verilir ve değeri label'ın ait olacağı input tag'inin id'si olur. JSX'te for yerine htmlFor var. ör: <label for="male">Male</label> <input type="radio" name="gender" id="male"> işte bir label'ın id'sini alıp for değerini veren javascript fonksiyonu htmlFor'dur. ör: var x = document.getElementById("myLabel").htmlFor;*/}
      <input id="search" type="text" value={props.search} onChange={props.onSearch} />
    </div>
  );

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
