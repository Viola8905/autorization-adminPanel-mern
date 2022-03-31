const SET_USER = 'SET_USER';
const SET_ADMIN = 'SET_ADMIN';
const LOGOUT = "LOGOUT";

const defaultState = {
	currentUser:{},
	isAuth:false,
	role:0

	
	
}

export default function userReducer(state = defaultState, action){
	switch (action.type) {
    case SET_USER:
			

      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
				role:0
			
        
      };

		case SET_ADMIN:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
				role:1
			
        
    };

    case LOGOUT:
			localStorage.removeItem('token')
      return {
        ...state,
        currentUser: {},
        isAuth: false,
				role:0,
       
      };
    default:
      return state;
  }
}

export const setUser = user =>({type:SET_USER, payload:user});
export const setAdmin = user =>({type:SET_ADMIN, payload:user});


export const logout = () => ({ type: LOGOUT});