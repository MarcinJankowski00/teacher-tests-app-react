import styled from "styled-components";

export const Wrapper = styled.div`
    @media (max-width: ${({ theme }) => theme.breakpoint.mobileMax}px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 10px
    }
`;

export const Button = styled.button<{ visible: boolean }>`
    display: ${({ visible }) => (visible ? "block" : "none")};
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.color.teal};
    cursor: pointer;

    &:disabled {
        color: ${({ theme }) => theme.color.silver};
        cursor: default;
    }

    &:hover {
        filter: brightness(110%);
    }

    &:active {
        filter: brightness(120%);
    }
`;