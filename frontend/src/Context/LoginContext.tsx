import {createContext, useContext, useReducer} from "react";

interface LoginState {
    loggedIn: Boolean;
    authToken: string | null;
}

const initialLoginState: LoginState = {
    loggedIn: false,
    authToken: localStorage.getItem("authToken"),
};

export type LoginAction =
    | { type: 'toggleLogin', payload: { toggle: boolean }}
    | { type: 'setAuthToken', payload: { token: string | null }};

const loginReducer = (state: LoginState, action: LoginAction) => {
    switch (action.type) {
        case 'toggleLogin':
            return {
                ...state,
                loggedIn: action.payload.toggle
            }
        case 'setAuthToken':
            return {
                    ...state,
                    authToken: action.payload.token
            }    
        default:
            return state;
    }
}


const LoginContext = createContext<LoginState | null>(null)

// Dispatch context
const LoginDispatchContext = createContext<React.Dispatch<LoginAction> | null>(null)


// Provider
type LoginProviderProps = React.PropsWithChildren<{ state?: LoginState }>

export function LoginProvider({children, state: explicitState}: LoginProviderProps) {
    const [state, dispatch] = useReducer(
        loginReducer, explicitState || initialLoginState);

    if (!state) {
        throw new Error("LoginContext: Initial state cannot be null.");
    }
    return (
        <LoginContext.Provider value={state}>
            <LoginDispatchContext.Provider value={dispatch}>
                {children}
            </LoginDispatchContext.Provider>
        </LoginContext.Provider>
    );
}

// state hook
export function useLoginState() {
    const state = useContext(LoginContext);
    if (state === null) {
        throw new Error("Unexpected useLoginState without parent <LoginProvider>");
    }
    return state;
}

// dispatch hook
export function useLoginDispatch() {
    const dispatch = useContext(LoginDispatchContext);
    if (dispatch === null) {
        throw new Error(
            "Unexpected useLoginDispatch without parent <LoginProvider>"
        );
    }
    return dispatch;
}
