import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media(max-width: ${({ theme }) => theme.breakpoint.mobileMax}px) {
        display: flex;
        flex-direction: column;
    }
`;

export const Button = styled.button`
    grid-column: 1 / -1;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.teal};
    margin: 20px 20px 0px 20px;
`;

export const Label = styled.div<{ short?: string }>`
    max-width: ${({ short }) => (short ==="true" ? "310px" : "none")};
    margin-bottom: 10px;
    ${({ short }) => (short ==="true" ? "display: flex;" : "")};
    justify-content: space-between;
    align-items: center;
    @media(max-width: ${({ theme }) => theme.breakpoint.mobileMax}px) {
        max-width: ${({ short }) => (short ==="true" ? "240px" : "none")};
    }
    @media(max-width: ${({ theme }) => theme.breakpoint.mobileMax1}px) {
        max-width: ${({ short }) => (short ==="true" ? "180px" : "none")};
    }
`;

export const StudentLabel = styled.div<{ short?: string }>`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Input = styled.input<{ long?: string }>`
    max-width: ${({ long }) => (long === "true" ? "none" : "50px")};
    width: ${({ long }) => (long === "true" ? "85%" : "50%")};
    margin: ${({ long }) => (long === "true" ? "0" : "0 5px")};
    border-radius: 5px;
    border-width: 1px;
    @media(max-width: ${({ theme }) => theme.breakpoint.mobileMax}px) {
        max-width: ${({ long }) => (long === "true" ? "60%" : "30px")};
    }
    @media(max-width: ${({ theme }) => theme.breakpoint.mobileMax1}px) {
        max-width: ${({ long }) => (long === "true" ? "60%" : "25px")};
    }
`;

export const KeyInput = styled.input`
    width: 300px;
    border-radius: 5px;
    border-width: 1px;
    @media(max-width: ${({ theme }) => theme.breakpoint.mobileMax}px) {
        width: 230px;
    }
    @media(max-width: ${({ theme }) => theme.breakpoint.mobileMax1}px) {
        width: 170px;
    }
`;

export const Div = styled.div`
    margin: 0 30px;
    @media(max-width: ${({ theme }) => theme.breakpoint.mobileMax}px) {
        margin: 0 15px;
    }
`;

export const Buttons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    @media(max-width: ${({ theme }) => theme.breakpoint.mobileMax1}px) {
        grid-template-columns: 1fr;
    }
`;

export const SecondaryButton = styled.button`
    
`;

export const TableContainer = styled.div`
    overflow-x: auto;
`;

export const Table = styled.table<{ result?: string , visible?: string }>`
    font-size: ${({ result }) => (result === "true" ? "none" : "15px")};
    display: ${({ visible }) => (visible === "true" ? "table" : "none")};
    text-align: center;
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 10px;
    @media(max-width: ${({ theme }) => theme.breakpoint.mobileMax1}px) {
        font-size: ${({ result }) => (result === "true" ? "none" : "10px")};
    }
`;

export const Cell = styled.td<{ result?: string }>`
    border: 2px solid gray;
    padding: 8px;
    text-align: center;
    max-width: ${({ result }) => (result === "true" ? "none" : "150px")};
    min-width: 50px;
`;

export const Img = styled.img`
    width: 20px;
`;

export const IconButton = styled.button`
    width: 40px;
    padding: 6px;
`;

export const List = styled.ul<{ visible?: string }>`
    display: ${({ visible }) => (visible === "true" ? "table" : "none")};
    list-style: none;
    width: 100%;
    padding: 0;
`;

export const Item = styled.li`
    display: grid;
    grid-template-columns: 3fr 1fr 5fr 50px 50px;
    text-align: center;
    align-items: center;
    grid-gap: 10px;
    border-bottom: 2px solid ${({ theme }) => theme.color.alto};
    padding: 10px;
`;



