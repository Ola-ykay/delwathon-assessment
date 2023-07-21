import { createStore } from 'vuex';
import axios from 'axios';
axios.defaults.baseURL = 'https://eduthon-api.delwathon.com/api';

const index = createStore({
  state: {
    authToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODY1NjAzZmIzMjNlZjE0MmJmYjViZTlhM2U5NTQ1ZjkzYTcyMDVmMDBhNzllOGYwMTI5Y2ZjZTEzY2E4MzU0OGZjZDA0ZTY4MzkyM2U0YzQiLCJpYXQiOjE2ODk4OTQ3MDguMzU1NzI1LCJuYmYiOjE2ODk4OTQ3MDguMzU1NzI3LCJleHAiOjE3MjE1MTcxMDguMzQ5Nzc2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.JIgVp5Y745UaWqGCofh9kDJ_yyyOJUQ0cQ1rMuGZh_v7D0y-Shg_2_wKBvYgg4Xn64C1sAUrSyD-NupfxUXWY2zmocUILKPWXwYQTqN-lCgWaT6poLp9ZBYhoqcuX2jPw5nyiE4nZeI7QRiUCdBmKfYT4xkKQSWo6mXbrWJ8fgPVFQd5VAKzbwqD0-8LmKILPwOCvtR4Sc60xO1h4sbIbToci3vvMlR8j7LrcqtCqqXHvrwr6T4pE_oE_5osW58e2Fu744kyBphZ0YOrrWi0m7NHIsfhc42ct0pIZlX_qWCtf0npucb4eE1eV4FlPa2QXcv4OG-RObMsR5I9ox0lfPzPWSh-riEMr29I-QtyTV1r-1L8YOhtqDk287hB5QAJXK9RoL3ooLzE3vnQV6VZCrzSyAmVcgQWmGIurJzTI8O5lO4UzwGg00LDCE7WA6nbwDiWmpHYLU5mYngYFhOlZDrm_0-2dWEGgs97rfanBIrDO05sXpTMi4GxxXNUG5etr3KE7p7BdJSsmqUXAeoitbKrn_aR8BGAg82CYJfuFwk2wmvTbmSxYsFP7zPVmvyUeZ2LT0IyQHs38fUkEo02DS1AQwwoZHi65vy-izX2W9GGevHuhT9c96pWEff2QDQ2SQTcPXrJiKJ1nLmwU5thiNCF-KuOT5aCWZK9bpmB7Nw',
    sessions: [],
    classes: [],
    sections: [],
    departments: [],
    states: [],
    lgas: [],
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token; 
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    setSessions(state, sessions) {
        state.sessions = sessions;
      },
      setClasses(state, classes) {
        state.classes = classes;
      },
      setSections(state, sections) {
        state.sections = sections;
      },
      setDepartments(state, departments) {
        state.departments = departments;
      },
      setStates(state, states) {
        state.states = states;
      },
      setLGAs(state, lgas) {
        state.lgas = lgas;
      },
  },
 actions: {
    fetchSessions({ commit, state }) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${state.authToken}`;
    
        return axios.get('https://eduthon-api.delwathon.com/api/academics/sessions')
          .then(response => {
            console.log('Sessions API response:', response.data);
            commit('setSessions', response.data.sessions);
          })
          .catch(error => {
            console.error('Error fetching sessions:', error);
            throw error;
          });
      },
    
      fetchClasses({ commit, state }, branchId) {
        const config = {
          headers: {
            Authorization: `Bearer ${state.authToken}`,
          },
        };
    
        return axios
          .get(`https://eduthon-api.delwathon.com/api/academics/filter/branch_classes/${branchId}`, config)
          .then(response => {
            commit('setClasses', response.data.classes);
          })
          .catch(error => {
            console.error('Error fetching classes:', error);
            throw error;
      });
  },
  fetchSections({ commit }, classId) {
    return axios.get(`https://eduthon-api.delwathon.com/api/academics/filter/class_sections/${classId}`)
      .then(response => {
        commit('setSections', response.data);
      })
      .catch(error => {
        console.error('Error fetching sections:', error);
      });
    },
    fetchDepartments({ commit }, branchId) {
        return axios.get(`https://eduthon-api.delwathon.com/api/academics/filter/branch_departments/${branchId}`)
          .then(response => {
            commit('setDepartments', response.data);
          })
          .catch(error => {
            console.error('Error fetching departments:', error);
          });
      },
      fetchStates({ commit }) {
        return axios.get('https://eduthon-api.delwathon.com/api/states')
          .then(response => {
            commit('setStates', response.data);
          })
          .catch(error => {
            console.error('Error fetching states:', error);
          });
      },
      fetchLGAs({ commit }, stateId) {
        return axios.get(`https://eduthon-api.delwathon.com/api/lg_for_a_state/${stateId}`)
          .then(response => {
            commit('setLGAs', response.data);
          })
          .catch(error => {
            console.error('Error fetching LGAs:', error);
          });
      },
}
});
   


export default index;