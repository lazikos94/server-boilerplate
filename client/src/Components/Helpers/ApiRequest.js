import cookie from './cookie';

class ApiRequest {
    constructor() {
        
    }

    async get(url){
        try{
            const res = await fetch(url, {
                method: "GET",
                mode: "cors",
                referrerPolicy: 'no-referrer',
                credentials: "same-origin",
                headers:{
                    'Content-Type':'application/json',
                    'Authentication': cookie('jwtToken')
                }
            })
            let responseData = await res.json();
            return { status: res.status, responseData, error: null }
        }catch(err){
           return { status: 500, responseData: null, error: err }
        }
    }
    async post(url, data){
        try{
            let local_data = data ? data : {};
            const res = await fetch(url, {
                method: "POST",
                mode: "cors",
                referrerPolicy: 'no-referrer',
                credentials: "same-origin",
                body: JSON.stringify(local_data),
                headers:{
                    'Content-Type':'application/json',
                    'Authentication': cookie('jwtToken')
                }
            })
            let responseData = await res.json();
            return { status: res.status, responseData, error: null }
        }catch(err){
           return { status: 500, responseData: null, error: err }
        }
    }

    async put(url, data){
        try{
            let local_data = data ? data : {};
            const res = await fetch(url, {
                method: "PUT",
                mode: "cors",
                referrerPolicy: 'no-referrer',
                credentials: "same-origin",
                headers:{
                    'Content-Type':'application/json',
                    'Authentication': cookie('jwtToken')
                },
                body: JSON.stringify(local_data),
            })
            let responseData = await res.json();
            return { status: res.status, responseData, error: null }
        }catch(err){
           return { status: 500, responseData: null, error: err }
        }
    }
    async delete(url, data){
        try{
            let local_data = data ? data : {};
            const res = await fetch(url, {
                method: "DELETE",
                mode: "cors",
                referrerPolicy: 'no-referrer',
                credentials: "same-origin",
                headers:{
                    'Content-Type':'application/json',
                    'Authentication': cookie('jwtToken')
                },
                body: JSON.stringify(local_data),
            })
            let responseData = await res.json();
            return { status: res.status, responseData, error: null }
        }catch(err){
           return { status: 500, responseData: null, error: err }
        }
    }
}


export default ApiRequest;