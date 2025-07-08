import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  font-size: 14px;
`;

export const DropdownToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  background: white;
  user-select: none;
`;

export const DropdownMenu = styled.ul<{ open: boolean }>`
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
  position: absolute;
  min-width: 125px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  z-index: 10;
  display: ${({ open }) => (open ? "block" : "none")};
`;

export const DropdownItem = styled.li`
  padding: 6px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Flag = styled.span`
  width: 20px;
  height: 14px;
`;