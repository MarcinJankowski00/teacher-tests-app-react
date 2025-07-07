import * as XLSX from "xlsx";

export const exportToExcel = (
  students: any[],
  headers: { id: string; row: string; score: string; grade: string },
  fileName = "wyniki.xlsx"
) => {
  const worksheetData = students.map((s) => ({
    [headers.id]: s.name,
    [headers.row]: s.row,
    [headers.score]: s.score,
    [headers.grade]: s.grade,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Wyniki");
  XLSX.writeFile(workbook, fileName);
};