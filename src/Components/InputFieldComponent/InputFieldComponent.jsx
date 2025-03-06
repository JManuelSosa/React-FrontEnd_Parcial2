export default function InputFieldComponent({
    id, 
    name, 
    textLabel, 
    icon: Icon, 
    type, 
    sizeIcon = 18, 
    onChange = () => {}, 
    onInput = () => {},
    isUpdate = false,
    value = ""
}){

    const renderTypeOfInput = () =>{

        if(type === "textarea"){
            return <textarea name={ name } id={ id } className="form-control" onChange={onChange} onInput={onInput} value={value} required={!isUpdate} rows="4"></textarea>
        }

        if(type === "file"){
            return <input type="file" className="form-control form-control-lg" name={name} id={id} accept=".jpeg, .jpg, .png" onChange={onChange}></input>
        }

        return <input type={ type } name={ name } id={ id } className="form-control" onChange={ onChange } onInput={ onInput } required={!isUpdate}
        value={value}/>
    }


    return(

        <>
            <div>
                <label className="d-block text-center" htmlFor={ id }>{ textLabel }</label>
                <div className="input-group">
                    <span className="input-group-text">
                        <Icon size={ sizeIcon }></Icon>
                    </span>
                    { renderTypeOfInput() }
                </div>
            </div>
        </>


    )

}