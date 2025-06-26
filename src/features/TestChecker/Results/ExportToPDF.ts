import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (students: any[], fileName = "wyniki.pdf") => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [["ID", "Rząd", "Punkty", "Ocena"]],
    body: students.map((s) => [s.name, s.row, s.score, s.grade]),
  });

  doc.save(fileName);
};