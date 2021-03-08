/**
 * Annova Özel Eğitim Kurumları ERP yazılımı
 * 
 * Copyright (c) Annova Software 2021
 * 
 * File:      App.js
 * 
 * Contents:  React eğitimi amaçlı deneme programı
 * 
 * History:   08.03.2021, drx
 */
import { useEffect, useState } from "react";
import InputWithLabel from "./InputWithLabel";
import Buu from "./Buu";

const Home = () => {
  const initialStories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Fatih KILINÇ',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'LOGO, SQL',
      url: 'https://docs.logo.com.tr/',
      author: 'Süleyman Özgü ŞENER',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Onur SÜRMEGÖZLÜER',
      num_comments: 2,
      points: 5,
      objectID: 2,
    },
  ];

  const [counter, incrementCounter] = useState(1);
  const inc = () => { incrementCounter(counter + 1) };
  const res = () => { incrementCounter(1) };

  const useSemiPersistantState = (key, initialState) => {
    const [value, setValue] = useState(localStorage.getItem(key) || initialState); // localStorage.getItem(key) dediğimizde
    // bu key localStorage'da varsa bu key'in karşılığı olan value dönüyor
    useEffect(() => {
      localStorage.setItem(key, value); // görüdüğü gibi localStorage'a key value pair'ler şeklinde kayıt yapıyoruz.
      // local storage browserın developer toolsunda application sekmesinde görülebiliyor.
    }, [key, value]); // useEffect'in 2. argümanı olan array optional ve bu array'e dependency
    // array deniyor. useEffect fonksiyonu component'in ilk render'ında ve dependency
    // array'deki değişkenlerin birinde değişiklik olduğunda çalışıyor (burada key veya
    // value değişirse çalışıyor). İkinci argüman olan dependency array'i yazmasak useEffect
    // component her render edildiğinde çalışır.
    // Boş bir array yazarsak sadece component'in ilk render'ında çalışır.
    return [value, setValue];
  };

  const [searchTerm, setSearchTerm] = useSemiPersistantState('search', '');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

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
    );

  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAsyncStories().then(result => { setStories(result.data.stories); setIsLoading(false); })
      .catch(() => setIsError(true)); // promise'ler promise return ettikleri için chain edilebilirler
  }, []);

  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  // filter'a argüman olarak boolean return eden bir fonksiyon verilir
  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
    || story.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1> E-school by Annova </h1>

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
      {isError && <p>Something went wrong ...</p>}{/** isError true olunca hem something went wrong
       * yazar, hem de alttakileri de render eder */}
      {isLoading ? (<p>Loading ...</p>) : (
      <Buu abc={searchedStories} onRemoveItem={handleRemoveStory} /> )} {/*Buu diye bir component türü tanımladım, bu türde bir
      // component oluşturuyorum ve abc diye bir custom HTML attribute'ü oluşturuyorum, ve datamı bu attribute'e JSX ile değer
      // olarak atıyorum. Burada searchedStories props oluyor (properties demek), yani App componentinden Buu componentine props
      // ile değişken geçirmiş oluyoruz.*/}
      <p>{counter}</p>
      <button type="button" onClick={inc}>inc</button>
      <button type="button" onClick={res}>reset</button>
    </div>
  );
};

export default Home