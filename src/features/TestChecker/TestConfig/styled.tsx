import styled from "styled-components";

export const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
`;

export const Button = styled.button`
    grid-column: 1 / -1;
`;

export const Label = styled.div`
   margin-bottom: 10px;
`;

export const Input = styled.input<{ long?: boolean }>`
    max-width: ${({ long }) => (long ? "200px" : "50px")};
    margin: 0 5px;
`;



