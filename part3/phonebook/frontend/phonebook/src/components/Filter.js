const Filter = ({keyword, handleKey}) => {

	return(
		<div>
          filter shown with 
          <input value={keyword} onChange={handleKey}/>
    </div>
	)
}

export default Filter;