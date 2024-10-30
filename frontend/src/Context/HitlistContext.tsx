import {createContext, useContext, useReducer} from "react";
import { Product } from "../Interfaces/Product";

interface HitlistState {
    hitlistItem: Product[];
}

const initialHitlistState: HitlistState = {
    hitlistItem: []
};

export type HitlistAction =
    | { type: 'addingWatchlistItem', payload: {product: Product}}
    | { type: 'removingWatchlistItem', payload: {productId: number}} 
    ;
//TODO: LATER
const hitlistReducer = (state: HitlistState, action: HitlistAction) => {
    switch (action.type) {
        case 'addingWatchlistItem':
            return {
                ...state,
                hitlistItem: [
                    ...state.hitlistItem,
                    action.payload.product
                ]
            }
        case 'removingWatchlistItem':
            return {
                ...state,
                hitlistItem: state.hitlistItem.filter(item => item.id !== action.payload.productId)
            }
            
        default:
            return state;
    }
}


const HitlistContext = createContext<HitlistState | null>(null);

// Dispatch context
const HitlistDispatchContext = createContext<React.Dispatch<HitlistAction> | null>(null);


// Provider
type HitlistProviderProps = React.PropsWithChildren<{ state?: HitlistState }>

export function HitlistProvider({children, state: explicitState}: HitlistProviderProps) {
    const [state, dispatch] = useReducer(
        hitlistReducer, explicitState || initialHitlistState);

    if (!state) {
        throw new Error("HitlistContext: Initial state cannot be null.");
    }
    return (
        <HitlistContext.Provider value={state}>
            <HitlistDispatchContext.Provider value={dispatch}>
                {children}
            </HitlistDispatchContext.Provider>
        </HitlistContext.Provider>
    );
}

// state hook
export function useHitlistState() {
    const state = useContext(HitlistContext);
    if (state === null) {
        throw new Error("Unexpected useHitlistState without parent <HitlistProvider>");
    }
    return state;
}

// dispatch hook
export function useHitlistDispatch() {
    const dispatch = useContext(HitlistDispatchContext);
    if (dispatch === null) {
        throw new Error(
            "Unexpected useHitlistDispatch without parent <HitlistProvider>"
        );
    }
    return dispatch;
}
