import axios from "axios"

// Step 1C
// Build axiosWithAuth module
export const axiosWithAuth = () => {
    return axios.create({
        baseURL: "http://localhost:5000/api/",
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}