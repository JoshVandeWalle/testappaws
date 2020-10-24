import axios from "axios";
const baseUrl = "http://54.219.163.122:8080/";
//const baseUrl = "http://localhost:8080/service/getjson";

export default {
    // functions for each controller in .NET CORE
    comment(url = baseUrl+"service/"){
        return {
            // for comment service
            fetchAll: () => axios.get(url+"/getjson"),
            create: (newRecord) => axios.post(url+"publish", newRecord),
            fetchById: (id) => axios.get(url+id),
            update: (updatedRecord) => axios.post(url+"edit", updatedRecord),
            delete: (id) => axios.get(url+"unpublish/"+id)
        }
    }
}

/*export default {
    comment(url = baseUrl+"user/"){
        return {
            // for comment service
            fetchAll: () => axios.get(url),
            create: (newRecord) => axios.post(url+"register", newRecord),
            fetchById: (id) => axios.get(url+id),
            update: (updatedRecord) => axios.put(url+"edit", updatedRecord),
            delete: (id) => axios.delete(url+"unregister/"+id)
        }
    }
}*/