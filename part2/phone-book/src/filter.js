const Filter = ({newSearch,setSearch})=>{
    const searchChanges = (e)=>{
        let search = e.target.value
        setSearch(search)
      }
    return (
        <div>
        filter by name : <input value={newSearch} onChange={searchChanges} />
      </div>
    )
}
export default Filter