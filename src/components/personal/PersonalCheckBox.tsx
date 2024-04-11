export default function CheckBox() {
  return (
    <label>
      <input
        id={id}
        type='checkbox'
        checked={bCheked}
        onChange={(e) => onCheckHandler(e)}
      />
      {text}
    </label>
  )
}
