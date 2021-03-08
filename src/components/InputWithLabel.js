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
    <p>Aranılan text : {value}</p>
    {/** fragment'ı kapatıyoruz */}</>
);

export default InputWithLabel