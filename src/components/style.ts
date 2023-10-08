// Styled-components for the table and table elements
import styled from "styled-components";

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 3px solid purple;
`;

// https://62f0041857311485d12c245d.mockapi.io/api/v1/needarim

export const TableHeadTh = styled.th`
  background-color: #04AA6D;
  color: white;
  padding: 20px;
`;

export const TableCell = styled.td`
  padding: 20px;
`;

export const TableRow = styled.tr`
  /* Default styles for table rows */
  th, td {
    padding: 20px;
  }

  /* Style for even rows */
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const Search = styled.input`
  width: 15em;
  height: 3em;
  border-radius: 2px;
  font-size: medium;
`

export const Button = styled.button`
  background: #8c54ff;
  border: 0;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 15px;
  transition: transform 100ms ease-out;
`;


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px; /* Adjust the gap between buttons as needed */
`;

export const ButtonModal = styled.button`
  background: #8c54ff;
  border: 0;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 15px;
  transition: transform 100ms ease-out;
`;


export const ModalBackdrop = styled.div`
	background: rgba(0, 0, 0, 0.02);
	bottom: 0;
	left: 0;
	overflow: auto;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 1;
`

export const ModalContainer = styled.div`
	background: #fff;
	border-radius: 5px;
	max-width: 100%;
	margin: 50px auto;
	padding: 15px;
	width: 560px;
`
