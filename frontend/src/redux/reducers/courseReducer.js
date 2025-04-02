// redux/reducers/courseReducer.js
const initialState = {
    courses: [],
    selectedCourse: null,
    videos: [],
    currentVideo: null,
    loading: false,
    error: null
  };
  
  export default function courseReducer(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_COURSES_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_COURSES_SUCCESS':
        return { ...state, loading: false, courses: action.payload };
      case 'FETCH_COURSES_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'SELECT_COURSE':
        return { ...state, selectedCourse: action.payload };
      case 'FETCH_VIDEOS_SUCCESS':
        return { ...state, videos: action.payload };
      case 'SELECT_VIDEO':
        return { ...state, currentVideo: action.payload };
      default:
        return state;
    }
  }