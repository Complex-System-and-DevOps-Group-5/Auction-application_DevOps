import {render} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {UpperMenu} from "../Components/UpperMenu.tsx";



describe('Header should display company name', () => {

    it('should display loading message when products are loading', async () => {
        const {getAllByText} = render(
            <UpperMenu />
        )
        expect(getAllByText('AUCTION...').length).toBeGreaterThan(0);
    });
});