// Type of state
import {createContext, useContext, useReducer} from "react";
import {Auction} from "../Interfaces/Auction.ts";

interface AuctionState {
    product: Auction[];
    isProductLoading: boolean;
    productError: boolean;
}

// Initial state
const initialAuctionState: AuctionState = {
    product: [],
    isProductLoading: true,
    productError: false,
};

// Type of actions
type AuctionAction =
    | { type: 'fetchingAuction' }
    | { type: 'updateCurrentBid', payload: { amount: number } }
    | { type: 'updateInWatchlist', payload: { toggle: boolean } }
    | { type: 'fetchedAuction', payload: { product: Auction[] } }
    | { type: 'auctionError', payload: { failed: boolean } }
    | { type: 'update', payload: { auction: number } } // this only updates  thew winning bid.
    ;

// Reducer
const auctionReducer = (state: AuctionState, action: AuctionAction) => {
    switch (action.type) {
        case 'fetchingAuction':
            return {
                ...state,
                isProductsLoading: true,
                productsError: false
            };
        case 'updateCurrentBid':
            return {
                ...state,
                product: {
                    ...state.product,
                    currentBid: action.payload.amount,
                }
            }
        case 'updateInWatchlist':
            return {
                ...state,
                product: {
                    ...state.product,
                    inWatchlist: action.payload.toggle,
                }
            }
        case 'fetchedAuction':
            return {
                ...state,
                product: action.payload.product,
                isProductLoading: false,
                productsError: false
            };
        case 'auctionError':
            return {
                ...state,
                isProductsLoading: false,
                productsError: action.payload.failed
            };
        default:
            return state;
    }
}

// State context
const AuctionContext = createContext<AuctionState | null>(null)

// Dispatch context
const AuctionDispatchContext = createContext<React.Dispatch<AuctionAction> | null>(null)

// Provider
type AuctionProviderProps = React.PropsWithChildren<{ state?: AuctionState }>

export function AuctionProvider({children, state: explicitState}: AuctionProviderProps) {
    const [state, dispatch] = useReducer(
        auctionReducer, explicitState || initialAuctionState);

    if (!state) {
        throw new Error("AuctionContext: Initial state cannot be null.");
    }
    return (
        <AuctionContext.Provider value={state}>
            <AuctionDispatchContext.Provider value={dispatch}>
                {children}
            </AuctionDispatchContext.Provider>
        </AuctionContext.Provider>
    );
}

// state hook
export function useAuctionState() {
    const state = useContext(AuctionContext);
    if (state === null) {
        throw new Error("Unexpected useAuctionState without parent <AuctionProvider>");
    }
    return state;
}

// dispatch hook
export function useAuctionDispatch() {
    const dispatch = useContext(AuctionDispatchContext);
    if (dispatch === null) {
        throw new Error(
            "Unexpected useAuctionDispatch without parent <AuctionProvider>"
        );
    }
    return dispatch;
}