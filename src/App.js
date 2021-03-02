import { useEffect, useState } from "react";

const App = () => {
  const initialStories = [
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

  const useSemiPersistantState = (key, initialState) => {
    const [value, setValue] = useState(localStorage.getItem(key) || initialState); // localStorage.getItem(key) dediğimizde
    // bu key localStorage'da varsa bu key'in karşılığı olan value dönüyor
    useEffect(() => {
      localStorage.setItem(key, value); // görüdüğü gibi localStorage'a key value pair'ler şeklinde kayıt yapıyoruz.
      // local storage browserın developer toolsunda application sekmesind görülebiliyor.
    }, [key, value]); // burada ikinci array optional ve bu array'e dependency array deniyor. useEffect fonksiyonu component'in
    // ilk render'ında ve sonra dependency array'deki değişkenlerin birinde değişiklik olduğunda çalışıyor (burada key veya
    // value değişirse çalışıyor). İkinci argüman olan dependency array'i yazmasak useEffect component her render edildiğinde çalışır.
    // Boş bir array yazarsak sadece component'in ilk render'ında çalışır.
    return [value, setValue];
  }

  const [searchTerm, setSearchTerm] = useSemiPersistantState('search', '');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  //const getAsyncStories = () => Promise.resolve({data: {stories: initialStories}});
/*   const getAsyncStories = () =>
    new Promise(resolve =>
      resolve({ data: { stories: initialStories } })
    ) */
  const getAsyncStories = () =>
    new Promise(resolve =>
      setTimeout(
        () => resolve({ data: { stories: initialStories } }),
        2000
      )
    )

  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAsyncStories().then(result => {
      setStories(result.data.stories);
      setIsLoading(false);
    });
  }, [])

  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  // filter'a argüman olarak boolean return eden bir fonksiyon verilir
  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1> My Hacker Stories </h1>

      {/* alttaki isFocused  isFocused={true} demek */}
      <InputWithLabel
        id='search'
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search :</strong>
      </InputWithLabel> {/* App diyor ki bir event olursa benim şu handlerıma haber ver */}

      <hr />
      {isLoading ? (<p>Loading ...</p>) : (
      <Buu abc={searchedStories} onRemoveItem={handleRemoveStory} /> )} {/*Buu diye bir component türü tanımladım, bu türde bir
      // component oluşturuyorum ve abc diye bir custom HTML attribute'ü oluşturuyorum, ve datamı bu attribute'e JSX ile değer
      // olarak atıyorum. Burada searchedStories props oluyor (properties demek), yani App componentinden Buu componentine props
      // ile değişken geçirmiş oluyoruz.*/}
    </div>
  );
}

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  isFocused,
  onInputChange,
  children
}) => (
  <> {/**react'ta component'ler 1den fazla eleman içeremiyor, birden fazla elemanı return edebilmek için div veya <></> yani
   *  fragment gibi bir etiket arasına alarak tek eleman haline getirmek gerekiyor */}
    <label htmlFor={id}>{children}</label> {/*normalde bir label'la bir inputun eşleşmesi için label'a for attribute'ü verilir
     ve değeri label'ın ait olacağı input tag'inin id'si olur. JSX'te for yerine htmlFor var. ör: <label for="male">Male</label>
      <input type="radio" name="gender" id="male"> işte bir label'ın id'sini alıp for değerini veren javascript fonksiyonu
       htmlFor'dur. ör: var x = document.getElementById("myLabel").htmlFor;*/}
    &nbsp;
    <input id={id} type={type} value={value} autoFocus={isFocused} onChange={onInputChange} /> {/**autoFocus sayesinde sayfa açılınca
     *  cursor text inputta olarak başlıyor */}
    <p>Searched term is : {value}</p>
    {/** fragment'ı kapatıyoruz */}</>
);

//const Buu = ({ abc }) => abc.map(({objectID, ...item}) => <Item key={objectID} {...item}/>); 
// Bu örnekte olduğu gibi JavaScript object destructuring, spread operator ve rest parameters kullanılabilir (üç nokta, biri
// assignment'ın sağında, bir solunda kullanılıyor, objenin geri kalan öğeleri gibi bir anlamı var). Bunları kullanmak kodları
// kısaltabilir (özellikle props'ları argüman olarak alıp verirken), ancak okunurluğu anlaşılırlığı azaltabilir ekip çalışmasında.
// JavaScript array destructuring ile object destructuring'i karıştırma
const Buu = ({ abc, onRemoveItem }) => abc.map(item =>
  <Item
    key={item.objectID}
    item={item}
    onRemoveItem={onRemoveItem}
  />);

const Item = ({ item, onRemoveItem }) => (
  <div>
    <span> <a href={item.url}>{item.title}</a> </span>
    <span> {item.author} </span>
    <span> {item.num_comments} </span>
    <span> {item.points} </span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}> {/** burada JS'teki bind metoduyla da item onRemoveItem'a verilebilirdi.
       *  handler'ın bu şekilde JSX içinde olmasına inline handler deniyor */}
        Dismiss
      </button>
    </span>
  </div>
)

export default App;