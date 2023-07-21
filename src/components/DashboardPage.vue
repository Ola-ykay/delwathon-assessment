<template>
  <div class="enroll-student-container">
    
    <div class="sidebar">
      <h2>Single Enrollment Form</h2>
      <h4>Enroll new student</h4>
      <div class="'form_container'">
      <form>
        <div>
          <label for="branch">Branch<span class="required-asterisk">*</span>:</label>
          <select id="branch" v-model="selectedBranch" required>
            <option :value="null" disabled selected>Select Branch</option>
            <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
          </select>
         
        </div>
        <button type="submit" @click="Registration">Proceed</button>
      </form>
    </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      branches: [],
      selectedBranch: null,
    };
  },
  created() {
    this.fetchBranches();
  },
  methods: {
    ...mapActions(['setSelectedBranch']),
    fetchBranches() {
      const authToken = this.$store.state.authToken;
      const branchesEndpoint = 'https://eduthon-api.delwathon.com/api/branches';
      
      axios.get(branchesEndpoint, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => {
          this.branches = JSON.parse(JSON.stringify(response.data.branches));
          // console.log('Dropdown Options:', this.branches);
        })
        .catch(error => {
          console.log('Error fetching branches:', error);
        });
    },
    Registration() {
      if (this.selectedBranch) {
        this.setSelectedBranch(this.selectedBranch); 
        this.$router.push('/enrollmentPage'); 
      } else {
        alert('Please select a branch.'); 
      }
    },

  },
};
</script>




<style scoped>
label{
 
margin-top: 5%;
width: 100px;
  display: inline-block;
  
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 10px;

}
span{
  color: red;
  padding: 5px;
  font-weight: 700;
}
form{
  width: 80%;
  height:30vh;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
.form_group{
  display: flex;
  flex-direction: column;
justify-content: center;
align-items: center;
}
select{
  width: 30%;
  outline: none;
  padding: 8px;
  border-radius: 5px;
margin-bottom: 10px;
}
option{
  color: black;
}
button{
  color: #fff;
  background: #0000ff;
  padding: 5px 10px;
  border-radius: 5px;
  outline:none;
  border: none;
}
</style>