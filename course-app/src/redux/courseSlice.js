import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  selectedCourse: null,
  enrolledCourses: [],
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload;
    },
    selectCourse(state, action) {
      state.selectedCourse = action.payload;
    },
    enrollCourse(state, action) {
      state.enrolledCourses = action.payload;
      console.log('b', action.payload);
    },
  },
});

export const { setCourses, selectCourse, enrollCourse } = courseSlice.actions;

export default courseSlice.reducer;
