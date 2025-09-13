import axios from "axios"

export const createShortUrl= async(url)=>{
    const {data}= await axios.post("http://localhost:5000/api/create", { url });
    return data
}