import {render} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {NavigationMenu} from "../Components/NavigationMenu.tsx";



describe('Header should display company name', () => {

    it('should render', ()=> {
        const {getAllByText} = render(
            <NavigationMenu />
        );
        expect(getAllByText('Home').length).toBeGreaterThan(0)
    });
});