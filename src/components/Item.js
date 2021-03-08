const Item = ({ item, onRemoveItem }) => (
    <div>
      <span> <a href={item.url}>{item.title}</a> </span>
      <span> {item.author} </span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}> {/** burada JS'teki bind metoduyla da item onRemoveItem'a verilebilirdi.
         *  handler'ın bu şekilde JSX içinde olmasına inline handler deniyor */}
          Dismiss
        </button>
      </span>
    </div>
  );

  export default Item;