import {createContext, useContext, useReducer} from "react";

interface ProductState {
    isSold: Boolean;
}

const initialProductState: ProductState = {
    isSold: false
};

type ProductAction =
    | { type: 'toggleSold', payload: { isSold: boolean }};

const productReducer = (state: ProductState, action: ProductAction) => {
    switch (action.type) {
        case 'toggleSold':
            return {
                ...state,
                isSold: action.payload.isSold
            }
        default:
            return state;
    }
}


const ProductContext = createContext<ProductState | null>(null)

// Dispatch context
const ProductDispatchContext = createContext<React.Dispatch<ProductAction> | null>(null)


// Provider
type ProductProviderProps = React.PropsWithChildren<{ state?: ProductState }>

export function ProductProvider({children, state: explicitState}: ProductProviderProps) {
    const [state, dispatch] = useReducer(
        productReducer, explicitState || initialProductState);

    if (!state) {
        throw new Error("ProductContext: Initial state cannot be null.");
    }
    return (
        <ProductContext.Provider value={state}>
            <ProductDispatchContext.Provider value={dispatch}>
                {children}
            </ProductDispatchContext.Provider>
        </ProductContext.Provider>
    );
}

// state hook
export function useProductState() {
    const state = useContext(ProductContext);
    if (state === null) {
        throw new Error("Unexpected useProductState without parent <ProductProvider>");
    }
    return state;
}

// dispatch hook
export function useProductDispatch() {
    const dispatch = useContext(ProductDispatchContext);
    if (dispatch === null) {
        throw new Error(
            "Unexpected useProductDispatch without parent <ProductProvider>"
        );
    }
    return dispatch;
}
