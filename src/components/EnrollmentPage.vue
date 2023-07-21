<template>
    <div class="registration_container">
        <h2>Enrollment Form</h2>
    <form @submit.prevent="submitForm">
      <label for="academicSession">Academic Session:</label>
      <select v-model="formData.academicSession" id="academicSession">
        <option v-for="session in sessions" :value="session.id" :key="session.id">{{ session.name }}</option>
      </select>

      <label for="enrollDate">Enroll Date:</label>
      <input type="text" v-model="formData.enrollDate" id="enrollDate" @focus="showCalendar" readonly />

      

      <label for="selectedClass">Class:</label>
      <select v-model="formData.selectedClass" id="selectedClass" @change="fetchSectionsAndDepartments">
        <option v-for="classItem in classes" :value="classItem.id" :key="classItem.id">{{ classItem.name }}</option>
      </select>

      <label for="selectedSection">Section:</label>
      <select v-model="formData.selectedSection" id="selectedSection">
        <option v-for="section in sections" :value="section.id" :key="section.id">{{ section.name }}</option>
      </select>

     

      <label for="selectedDepartment">Department:</label>
      <select v-model="formData.selectedDepartment" id="selectedDepartment">
        <option v-for="department in departments" :value="department.id" :key="department.id">{{ department.name }}</option>
      </select>

           

      <label for="selectedState">State:</label>
      <select v-model="formData.selectedState" id="selectedState" @change="fetchLGAs">
        <option v-for="state in states" :value="state.id" :key="state.id">{{ state.name }}</option>
      </select>

     

      <label for="selectedLGA">LGA:</label>
      <select v-model="formData.selectedLGA" id="selectedLGA">
        <option v-for="lga in lgas" :value="lga.id" :key="lga.id">{{ lga.name }}</option>
      </select>
      <input type="hidden" v-model="formData.token" id="token" />
      <button type="submit">Enrol</button>
    </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
    formData: {
        academicSession: null,
        enrollDate: '',
        selectedClass: null,
        selectedSection: null,
        selectedDepartment: null,
        selectedState: null,
        selectedLGA: null,
        token: '',
      },
      showClass: false,
      showSection: false,
      showDepartment: false,
      showLGA: false,

        };
    },
  computed: {
    ...mapState(['sessions', 'classes', 'sections', 'departments', 'states', 'lgas']),
    token() {
      return this.$store.state.authToken;
    },
  },
  mounted() {
  if (this.token) {
    this.fetchSessions()
      .then(() => {
        this.fetchData();
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
  }
},


 
  methods: {
    ...mapActions([
      'fetchSessions',
      'fetchClasses',
      'fetchSections',
      'fetchDepartments',
      'fetchStates',
      'submitForm'
      ]),

      fetchData() {
  if (!this.sessions || this.sessions.length === 0) {
    console.error('Sessions array is empty or undefined.');
    return;
  }
  const activeSession = this.sessions.find(session => session.active === 1);
  if (activeSession) {
    this.formData.academicSession = activeSession.id;
  }
},

fetchClassesForBranch(branchId) {
      
      this.fetchClasses(branchId)
        .then(() => {
          console.log('Classes fetched successfully.');
          
        })
        .catch(error => {
          console.error('Error fetching classes:', error);
        });
    },

   

    fetchSectionsAndDepartments() {
      if (this.formData.selectedClass) {
        this.fetchSections(this.formData.selectedClass);
        this.fetchDepartments(this.formData.selectedClass);
      }
    },
    fetchLGAsForSelectedState() {
      if (this.formData.selectedState) {
        this.fetchLGAs(this.formData.selectedState);
      }
    },
    showCalendar() {
      // 
    },

   
    submitForm() {
      // 
    },
  },
};
</script>

<style scoped>
.registration_container{
    max-width: 500px;
  margin: auto;
  padding: 30px;
 
  width: 500px;
  height: 100vh;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

form{

    display: flex;
    flex-direction: column;
  
    justify-content: center;
  
    
     
}
label{
text-align: left;
  display: inline-block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 10px;
}
select {
    margin-bottom: 10px;
    outline: none;
    border-radius: 5px;
    padding: 5px;
    /* width: 50%; */
    /* max-width: 50%; */
}
input{
    margin-bottom: 10px;
    outline: none;
    border-radius: 5px;
    padding: 5px;
    outline: none;
    color: grey;
}
button{
    color: #fff;
    background: #0000ff;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin-top: 40px;
}

@media screen and (max-width: 768px) {
    .registration_container{
        width: 100%;
        margin: 0;
    padding: 0;
    }
    select{
        width: 100%;
    }
}
button{
margin-top: 8px;
}


</style>