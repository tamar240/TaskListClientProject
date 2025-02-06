import axios from 'axios';

if (!process.env.REACT_APP_API_URL) {
  console.warn("Warning: Missing environment variable REACT_APP_API_URL");
}
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// הוספת Interceptor לתפיסת שגיאות בתגובה
axios.interceptors.response.use(
  response => response, // אם התגובה תקינה החזר אותה כמו שהיא
  error => {
    console.error('Error in Axios response:', error.message || error);
    alert("An error occurred while processing your request. Please try again.");
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)    
    return result.data;
  },

  addTask: async(name)=>{

    const result = await axios.post(`/items`,{Name:name})   
    return result.data;
  },
  setCompleted: async (id, IsComplete) => {
    const result = await axios.put(`/items/${id}`, {IsComplete: IsComplete});   
    return result.data;
  }
,
  deleteTask:async(id)=>{
    console.log('deleteTask')
    const result = await axios.delete(`/items/${id}`)   
  }
};
