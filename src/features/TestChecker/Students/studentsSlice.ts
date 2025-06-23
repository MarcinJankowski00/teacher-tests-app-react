import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Student } from "../../../types";

type StudentsState = {
  list: Student[];
};

const initialState: StudentsState = {
  list: [],
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents(state, action: PayloadAction<Student[]>) {
      state.list = action.payload;
    },
    addStudent(state, action: PayloadAction<Student>) {
      state.list.push(action.payload);
    },
    removeStudentById(state, action: PayloadAction<string>) {
      state.list = state.list.filter((student) => student.id !== action.payload);
    },
    clearStudents(state) {
      state.list = [];
    },
    updateStudent(state, action: PayloadAction<Student>) {
      const index = state.list.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const {
  setStudents,
  addStudent,
  removeStudentById,
  clearStudents,
  updateStudent,
} = studentsSlice.actions;

export default studentsSlice.reducer;