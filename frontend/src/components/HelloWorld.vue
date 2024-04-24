<template>
  <div>
    <h1>Insert User</h1>
    <form @submit.prevent="submitForm">
      <label for="firstName">First Name:</label>
      <input type="text" v-model="formData.firstName" required><br>

      <label for="lastName">Last Name:</label>
      <input type="text" v-model="formData.lastName" required><br>

      <label for="email">Email:</label>
      <input type="email" v-model="formData.email" required><br>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        });

        if (response.ok) {
          console.log('User created successfully!');
          this.formData = {
            firstName: '',
            lastName: '',
            email: ''
          };
        } else {
          console.error('Failed to create user:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  }
};
</script>
