import {render} from "@testing-library/react";
import App from "../App.tsx";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {LoginProvider} from "../Context/LoginContext.tsx";
const mockedUsedNavigate = vi.fn();

vi.mock(import("react-router-dom"), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate
    }
})

describe('AUCTION', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    })
    it("should render", () => {
        const {getAllByText} = render(
            <LoginProvider>
                <App />
            </LoginProvider>
        );
        expect(getAllByText('AUC').length).toBeGreaterThan(0)
    });
});