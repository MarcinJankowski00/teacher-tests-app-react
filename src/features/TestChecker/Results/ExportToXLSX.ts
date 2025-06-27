import * as XLSX from "xlsx";

export const exportToExcel = (students: any[], fileName = "wyniki.xlsx") => {
  const worksheetData = students.map((s) => ({
    "ID ucznia": s.name,
    "Rząd": s.row,
    "Punkty": s.score,
    "Ocena": s.grade,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Wyniki");

  XLSX.writeFile(workbook, fileName);
};