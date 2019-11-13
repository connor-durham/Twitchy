import axios from "axios"

let api = axios.create({
    headers: {
        'Client-ID' : 'lc1drab1ynkrk7g4ikjtwontg0x20m'
    }
})

export default api