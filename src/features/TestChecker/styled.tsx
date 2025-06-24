import styled from "styled-components";

export const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
        @media(max-width: ${({ theme }) => theme.breakpoint.mobileMax}px) {
        grid-template-columns: 1fr;
    }
`;

export const FormDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
        @media(max-width: ${({ theme }) => theme.breakpoint.mobileMax}px) {
        grid-template-columns: 1fr;
    }
`;

export const Button = styled.button`
    grid-column: 1 / -1;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.teal};
    margin: 0 15px;
`;

export const Label = styled.div<{ short?: boolean }>`
    max-width: ${({ short }) => (short ? "300px" : "none")};
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Input = styled.input<{ long?: boolean }>`
    max-width: ${({ long }) => (long ? "100%" : "50px")};
    margin: ${({ long }) => (long ? "0" : "0 5px")};
    border-radius: 5px;
    border-width: 1px;
`;

export const Div = styled.div`
    margin: 0 30px;
`;

export const Table = styled.table<{ result?: boolean }>`
    font-size: ${({ result }) => (result ? "none" : "15px")};
    text-align: center;
    border-collapse: collapse;
    width: ${({ result }) => (result ? "100%" : "none")};
`;

export const Cell = styled.td<{ result?: boolean }>`
    border: 2px solid gray;
    padding: 8px;
    text-align: center;
    max-width: ${({ result }) => (result ? "none" : "150px")};
    min-width: 50px;
`;



