import {createContext,useState,useEffect,useContext,useReducer} from 'react';
import {auth_reducer,auth_Initialstate} from './reducers/reducer';
import types from './reducers/types';
import getCookie from '../Helpers/cookie';
import ApiRequest from '../Helpers/ApiRequest';

const cookie = getCookie('jwtToken');

const AuthContext = createContext();

export const Provider  = ({children})=>{
    const [globalState,dispatchGlobalState] = useReducer(auth_reducer,auth_Initialstate);
    const [token, setToken] = useState(cookie);
    const [Api, setApi] = useState(new ApiRequest);

    useEffect(() => {
        if(token){
            authApiRequest(dispatchGlobalState,Api)
        }else{
            dispatchGlobalState({key:types.LOADING})
        }

    }, [])
    if(globalState.isLoading) return <div>Loading...</div>
    return(
        <AuthContext.Provider value={{globalState,dispatchGlobalState}}>
            {children}
        </AuthContext.Provider>
    )

}

export default function useMain (){
    const { globalState,dispatchGlobalState} = useContext(AuthContext);
    return { globalState,dispatchGlobalState};
}

async function authApiRequest(dispatchGlobalState,Api){
    const Response = await Api.get('/api/auth');
    if(Response.error || Response.status !== 200){
        dispatchGlobalState({key:types.NOTAUTHENTICATED})
    }else{
        dispatchGlobalState({key:types.AUTHENTICATED, payload:{token:'default', isAuth:true, user:Response.responseData.data.user}})
    }
}
