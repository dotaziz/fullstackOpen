
import axios  from 'axios'

const url = '/api/persons'

const getAll= ()=>{
    return axios.get(url)
}

const add =({name, number})=>{
    return axios.post(url,{name,number})
}

const remove = ({ id })=>{
    return axios.delete(url.concat(`/${id}`))
}

const edit = ({ id,name, number })=>{
    return axios.put(url.concat(`/${id}`),{name,number})
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    add,
    remove,
    edit
}