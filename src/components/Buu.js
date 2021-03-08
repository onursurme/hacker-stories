import Item from "./Item";

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

export default Buu