
const RadioComponent = (props) => { 
  const {type, options, title, onChange } = props;
  return(
  <div>
    <label htmlFor={title}>{title}</label>
    {options.map(data => (
   <>   
    <input 
    type={type} 
    value={data.key}
    id={data.key}
    name={title}
    defaultChecked={data.default} 
    onChange={onChange}/>
    <label htmlFor={data.key}>{data.label}</label>
   </>
    ))}
  </div>
);
  };
export default RadioComponent;