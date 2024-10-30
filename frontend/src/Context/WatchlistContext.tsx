import {createContext, useContext, useReducer} from "react";
import { Product } from "../Interfaces/Product";

interface WatchlistState {
    watchlistItem: Product[];
}

const initialWatchlistState: WatchlistState = {
    watchlistItem: []
};

export type WatchlistAction =
    | { type: 'addingWatchlistItem', payload: {product: Product}}
    | { type: 'removingWatchlistItem', payload: {productId: number}} 
    ;
//TODO: LATER
const watchlistReducer = (state: WatchlistState, action: WatchlistAction) => {
    switch (action.type) {
        case 'addingWatchlistItem':
            return {
                ...state,
                watchlistItem: [
                    ...state.watchlistItem,
                    action.payload.product
                ]
            }
        case 'removingWatchlistItem':
            return {
                ...state,
                watchlistItem: state.watchlistItem.filter(item => item.id !== action.payload.productId)
            }
            
        default:
            return state;
    }
}


const WatchlistContext = createContext<WatchlistState | null>(null);

// Dispatch context
const WatchlistDispatchContext = createContext<React.Dispatch<WatchlistAction> | null>(null);


// Provider
type WatchlistProviderProps = React.PropsWithChildren<{ state?: WatchlistState }>

export function WatchlistProvider({children, state: explicitState}: WatchlistProviderProps) {
    const [state, dispatch] = useReducer(
        watchlistReducer, explicitState || initialWatchlistState);

    if (!state) {
        throw new Error("WatchlistContext: Initial state cannot be null.");
    }
    return (
        <WatchlistContext.Provider value={state}>
            <WatchlistDispatchContext.Provider value={dispatch}>
                {children}
            </WatchlistDispatchContext.Provider>
        </WatchlistContext.Provider>
    );
}

// state hook
export function useWatchlistState() {
    const state = useContext(WatchlistContext);
    if (state === null) {
        throw new Error("Unexpected useWatchlistState without parent <WatchlistProvider>");
    }
    return state;
}

// dispatch hook
export function useWatchlistDispatch() {
    const dispatch = useContext(WatchlistDispatchContext);
    if (dispatch === null) {
        throw new Error(
            "Unexpected useWatchlistDispatch without parent <WatchlistProvider>"
        );
    }
    return dispatch;
}
