import {createContext, useContext, useReducer} from "react";
import { Product } from "../Interfaces/Product";

interface OngoingState {
    ongoingBids: Product[];
}

const initialOngoingState: OngoingState = {
    ongoingBids: []
};

type OngoingAction =
    | { type: 'addBid', payload: Product }
    | { type: 'removeBid', payload: { id: string } };

    const ongoingReducer = (state: OngoingState, action: OngoingAction) => {
        switch (action.type) {
            case 'addBid':
                return {
                    ...state,
                    ongoingBids: [...state.ongoingBids, action.payload]
                };
            case 'removeBid':
                return {
                    ...state,
                    ongoingBids: state.ongoingBids.filter(bid => bid.id !== action.payload.id)
                };
            default:
                return state;
        }
    }


const OngoingContext = createContext<OngoingState | null>(null);

// Dispatch context
const OngoingDispatchContext = createContext<React.Dispatch<OngoingAction> | null>(null);

// Provider
type OngoingProviderProps = React.PropsWithChildren<{ state?: OngoingState }>;

export function OngoingProvider({ children, state: explicitState }: OngoingProviderProps) {
    const [state, dispatch] = useReducer(
        ongoingReducer, explicitState || initialOngoingState
    );

    if (!state) {
        throw new Error("OngoingContext: Initial state cannot be null.");
    }

    return (
        <OngoingContext.Provider value={state}>
            <OngoingDispatchContext.Provider value={dispatch}>
                {children}
            </OngoingDispatchContext.Provider>
        </OngoingContext.Provider>
    );
}

// state hook
export function useOngoingState() {
    const state = useContext(OngoingContext);
    if (state === null) {
        throw new Error("Unexpected useOngoingState without parent <OngoingProvider>");
    }
    return state;
}

// dispatch hook
export function useOngoingDispatch() {
    const dispatch = useContext(OngoingDispatchContext);
    if (dispatch === null) {
        throw new Error(
            "Unexpected useOngoingDispatch without parent <OngoingProvider>"
        );
    }
    return dispatch;
}