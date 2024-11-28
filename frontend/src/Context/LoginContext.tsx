import {createContext, useContext, useReducer} from "react";

interface LoginState {
    loggedIn: Boolean;
    username: string;
    authToken: string;
    isUserLoading: boolean;
    userError: string;
}

const initialLoginState: LoginState = {
    loggedIn: false,
    username: '',
    authToken: '',
    isUserLoading: true,
    userError: '',
};

export type LoginAction =
    | { type: 'toggleLogin', payload: { toggle: boolean }}
    | { type: 'setAuthToken', payload: { token: string}}
    | { type: 'setUsername', payload: { username: string }}
    | { type: 'setIsUserLoading', payload: { loading: boolean }}
    | { type: 'setUserError', payload: { failed: string }
};

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
        case 'setUsername':
            return {
                ...state,
                username: action.payload.username
            }
        case 'setIsUserLoading':
            return {
                ...state,
                isUserLoading: action.payload.loading
            }
        case 'setUserError':
            return {
                ...state,
                userError: action.payload.failed
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
        throw new Error("Unexpected <useLoginStat></useLoginStat>e without parent <LoginProvider>");
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
