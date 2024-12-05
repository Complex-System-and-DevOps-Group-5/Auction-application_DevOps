import {render} from "@testing-library/react";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {NavigationMenu} from "../Components/NavigationMenu.tsx";

const mockedUsedNavigate = vi.fn();

vi.mock(import("react-router-dom"), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate
    }
})

describe('Header should display company name', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    })
    it('should render', ()=> {
        const {getAllByText} = render(
            <NavigationMenu />
        );
        expect(getAllByText('Home').length).toBeGreaterThan(0)
    });
});