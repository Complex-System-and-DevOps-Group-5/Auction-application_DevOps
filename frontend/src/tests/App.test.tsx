import {render} from "@testing-library/react";
import App from "../App.tsx";
import { describe, expect, it, vi, beforeEach } from "vitest";
import {RouteObject} from "react-router-dom";

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom') as RouteObject,
    useNavigate: () => mockedUsedNavigate,
}));

describe('AUCTION', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    })
    it("should render", () => {
        const {getAllByText} = render(<App />);
        expect(getAllByText('Auction').length).toBeGreaterThan(0)
    });
});