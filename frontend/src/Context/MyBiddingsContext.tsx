import { createContext, useContext, useReducer } from "react";
import { Product } from "../Interfaces/Product";


interface MyBiddingsState {
    pastBids: Product[];
}

const initialMyBiddingsState: MyBiddingsState = {
    pastBids: []
};

// Define the possible actions for modifying the past bids
export type MyBiddingsAction =
    | { type: 'addPastBid', payload: Product }
    | { type: 'removePastBid', payload: { id: number } };

// Create the reducer function that handles state updates
const myBiddingsReducer = (state: MyBiddingsState, action: MyBiddingsAction) => {
    switch (action.type) {
        case 'addPastBid':
            return {
                ...state,
                pastBids: [...state.pastBids, action.payload]
            };
        case 'removePastBid':
            return {
                ...state,
                pastBids: state.pastBids.filter(bid => bid.id !== action.payload.id)
            };
        default:
            return state;
    }
}


const MyBiddingsContext = createContext<MyBiddingsState | null>(null);

// Dispatch context
const MyBiddingsDispatchContext = createContext<React.Dispatch<MyBiddingsAction> | null>(null);

// provider
type MyBiddingsProviderProps = React.PropsWithChildren<{ state?: MyBiddingsState }>;

export function MyBiddingsProvider({ children, state: explicitState }: MyBiddingsProviderProps) {
    const [state, dispatch] = useReducer(
        myBiddingsReducer, explicitState || initialMyBiddingsState
    );

    if (!state) {
        throw new Error("MyBiddingsContext: Initial state cannot be null.");
    }

    return (
        <MyBiddingsContext.Provider value={state}>
            <MyBiddingsDispatchContext.Provider value={dispatch}>
                {children}
            </MyBiddingsDispatchContext.Provider>
        </MyBiddingsContext.Provider>
    );
}

// State hook
export function useMyBiddingsState() {
    const state = useContext(MyBiddingsContext);
    if (state === null) {
        throw new Error("Unexpected useMyBiddingsState without parent <MyBiddingsProvider>");
    }
    return state;
}

// dispatch hook
export function useMyBiddingsDispatch() {
    const dispatch = useContext(MyBiddingsDispatchContext);
    if (dispatch === null) {
        throw new Error(
            "Unexpected useMyBiddingsDispatch without parent <MyBiddingsProvider>"
        );
    }
    return dispatch;
}
