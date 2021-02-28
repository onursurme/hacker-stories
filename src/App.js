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

  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('search')||'e');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    localStorage.setItem('search', event.target.value); // localStorage'ı bu şekilde yazmanın dezavantajı : programın başka bir yerinde searchTerm değiştiğinde, setSearchTerm çağrıldığında orada localStorage'ı update etmeyi unutabiliriz. Daha kolay ve garanti olanı useEffect hook'u kullanmak.
  }

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

const Search = props => (  // aslında props yerine ({search,onSearch}) yazarsak altta props.search yerine search, props.onSearch yerine de onSearch yazabiliriz.
  <div>
    <label htmlFor="search">Search: </label> {/*normalde bir label'la bir inputun eşleşmesi için label'a for attribute'ü verilir ve değeri label'ın ait olacağı input tag'inin id'si olur. JSX'te for yerine htmlFor var. ör: <label for="male">Male</label> <input type="radio" name="gender" id="male"> işte bir label'ın id'sini alıp for değerini veren javascript fonksiyonu htmlFor'dur. ör: var x = document.getElementById("myLabel").htmlFor;*/}
    <input autoFocus id="search" type="text" value={props.search} onChange={props.onSearch} /> {/**autoFocus sayesinde sayfa açılınca cursor text inputta olarak başlıyor */}
    <p>Searched term is : {props.search}</p>
  </div>
);

//const Buu = ({ abc }) => abc.map(({objectID, ...item}) => <Item key={objectID} {...item}/>); 
// Bu örnekte olduğu gibi JavaScript object destructuring, spread operator ve rest parameters kullanılabilir (üç nokta, biri assignment'ın sağında, bir solunda kullanılıyor, objenin geri kalan öğeleri gibi bir anlamı var). Bunları kullanmak kodları kısaltabilir (özellikle props'ları argüman olarak alıp verirken), ancak okunurluğu anlaşılırlığı azaltabilir ekip çalışmasında. JavaScript array destructuring ile object destructuring'i karıştırma
const Buu = ({abc}) => abc.map(item => <Item key={item.objectID} item={item} />);

const Item = ({item}) => (
  <div>
    <span> <a href={item.url}>{item.title}</a> </span>
    <span> {item.author} </span>
    <span> {item.num_comments} </span>
    <span> {item.points} </span>
  </div>
);

export default App;