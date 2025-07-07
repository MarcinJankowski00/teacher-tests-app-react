import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (
  students: any[],
  headers: string[],
  fileName = "wyniki.pdf"
) => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [headers],
    body: students.map((s) => [s.name, s.row, s.score, s.grade]),
  });

  doc.save(fileName);
};