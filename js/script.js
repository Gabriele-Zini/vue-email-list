const { createApp } = Vue;

createApp({
  data() {
    return {
      randomEmail: "",
      emails: [],
      numberOfEmails: 0,
    };
  },
  methods: {
    generateEmail() {
      this.emails = [];
      for (let i = 0; i < this.numberOfEmails; i++) {
        axios
          .get("https://flynn.boolean.careers/exercises/api/random/mail")
          .then((resp) => {
            this.randomEmail = resp.data.response;
            console.log(this.randomEmail);
            this.emails.push(this.randomEmail);
          });
      }
    },
  },
}).mount("#app");
