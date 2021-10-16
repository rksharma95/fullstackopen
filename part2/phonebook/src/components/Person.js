const Person = (props) => {

	const {persons, searchKey, searchResult} = props.props

	const handleClick = (e) => {
		const id = e.target.getAttribute('id')
		const name = e.target.getAttribute('name')
		const confirm = window.confirm(`Delete ${name} ?`)
		if(confirm)
			props.handleDelete(id)
	}

	return (
		<div>
		{ searchKey === '' ? 
        persons.map(person => 
			<div key = {person.name}>
				<p>{person.name} {person.number}
					<button type="button" id={person.id} name={person.name} onClick={handleClick}>delete</button>
				</p>
			</div>)
        : searchResult.map(person => <p key={person.name}>{person.name}</p>)
    	}
    	</div>
	)
}

export default Person;