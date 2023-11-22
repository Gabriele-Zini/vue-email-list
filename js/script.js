const { createApp } = Vue;

createApp({
  data() {
    return {
      randomEmail: "",
      emails: [],
      numberOfEmails: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      formattedTime: "00:00:00",
      intervalId: null,
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
            if (this.emails.length > this.numberOfEmails) {
              this.emails = [];
            }
          });
      }
    },
    timer() {
      clearInterval(this.intervalId);
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
      this.intervalId = setInterval(() => {
        this.formattedTime = "00:00:00";
        this.seconds++;

        if (this.seconds === 60) {
          this.seconds = 0;
          this.minutes++;
        }
        if (this.minutes === 60) {
          this.minutes = 0;
          this.hours++;
        }
        this.formattedTime =
          this.hours.toString().padStart(2, "0") +
          ":" +
          this.minutes.toString().padStart(2, "0") +
          ":" +
          this.seconds.toString().padStart(2, "0");

        console.log(this.formattedTime);

        if (this.emails.length === this.numberOfEmails) {
          clearInterval(this.intervalId);
        }
      }, 1000);
    },
    generateEmailAndTimer() {
      this.timer();
      this.generateEmail();
    },
  },
}).mount("#app");
