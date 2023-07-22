<template>
    <div class="registration_container">
        <h2>Enrollment Form</h2>
    <form @submit.prevent="submitForm">
      <label for="academicSession">Academic Session:</label>
      <select v-model="formData.academicSession" id="academicSession">
        <option v-for="session in sessions" :value="session.id" :key="session.id">{{ session.name }}</option>
      </select>

      <label for="enrollDate">Enroll Date:</label>
      <input type="date" v-model="formData.enrollDate" id="enrollDate"  @change="updateEnrollDate" />

      

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
      <select v-model="formData.selectedState" id="selectedState" @change="fetchLGAsForSelectedState">
        <option v-for="state in states" :value="state.id" :key="state.id">{{ state.name }}</option>
      </select>

     

      <label for="selectedLGA">LGA:</label>
      <select v-model="formData.selectedLGA" id="selectedLGA" >
        <option v-for="lga in lgas" :value="lga.id" :key="lga.id">{{ lga.name }}</option>
      </select>

      <label for="firstName">First Name:</label>
      <input v-model="formData.firstName" id="firstName" type="text" required />

      <label for="lastName">Last Name:</label>
      <input v-model="formData.lastName" id="lastName" type="text" required />

      <label for="middleName">Middle Name:</label>
      <input v-model="formData.middleName" id="middleName" type="text" required />

      <label for="email">Email:</label>
      <input v-model="formData.email" type="email" id="email" required />

      <label for="city">City:</label>
      <input v-model="formData.city" id="city" type="text" required />

      <label for="genotype">Genotype:</label>
      <select v-model="formData.genotype" id="genotype" required>
        <option :value="null" disabled selected>Select genotype</option>
        <option value="AS">AS</option>
        <option value="SC">SC</option>
        <option value="SS">SS</option>
        <option value="AC">AC</option>
      </select>

      <input type="hidden" v-model="formData.token" id="token" />
      <button type="submit">Enrol</button>

    </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
    formData: {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      genotype: [],
        academicSession: null,
        enrollDate: '',
        selectedClass: null,
        selectedSection: null,
        selectedDepartment: null,
        selectedState: null,
        selectedLGA: null,
        token: '',
      },
    

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
    this.fetchClasses()
    this.fetchStates()
    this.fetchLGAs()
    
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
      'fetchLGAs',
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

updateEnrollDate() {
      
      const selectedDate = new Date(this.formData.enrollDate);
      const formattedDate = selectedDate.toISOString().split('T')[0];
      this.formData.enrollDate = formattedDate;
    },

fetchClassesForBranch() {
  
      this.fetchClasses()
        .then(() => {
          console.log('Classes fetched successfully.');
          // Handle any other logic after fetching classes if needed
        })
        .catch(error => {
          console.error('Error fetching classes:', error);
        });
    },

      

   

    fetchSectionsAndDepartments() {
      if (this.formData.selectedClass) {
        this.fetchSections(this.formData.selectedClass);
        this.fetchDepartments();
      }
    },
 

    fetchLGAsForSelectedState() {
      console.log('Selected state:', this.formData.selectedState);
      if (this.formData.selectedState) {
        this.fetchLGAs(this.formData.selectedState)
          .then(() => {
            console.log('LGAs fetched successfully.');
          })
          .catch(error => {
            console.error('Error fetching LGAs:', error);
          });
      }
    },

    showCalendar() {
      // 
    },

   
    submitForm() {
      const enrollmentData = {
        academic_session_id: this.formData.academicSession,
        enroll_date: this.formData.enrollDate,
        class_id: this.formData.selectedClass,
        section_id: this.formData.selectedSection,
        department_id: this.formData.selectedDepartment,
        state_id: this.formData.selectedState,
        lga_id: this.formData.selectedLGA,
      };

      const branchId = 0; 
      const endpoint = `https://eduthon-api.delwathon.com/api/single_enrol/${branchId}`;

      axios
      .post(endpoint, enrollmentData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          console.log('Enrollment successful:', response.data);
          alert("Please select a branch.");
       
        })
        .catch(error => {
          console.error('Error enrolling:', error);
          
        });
    },
  },
};
</script>

<style scoped>
.registration_container{
    max-width: 500px;
  margin: auto;
  padding: 50px;
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
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    
}
input{
    margin-bottom: 10px;
    outline: none;
    border-radius: 5px;
    padding: 5px;
   
    color: grey;
}
input[type="email"],
input[type='date'],
input[type="text"] {
  border: 1px solid #ccc;
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
        padding: 50px;
       
    }
    select{
        width: 100%;
    }
}
button{
margin-top: 8px;
}


</style>