// formatter Object. Using javascript localization
// capabilities to do the job
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
});

new Vue({
  el: '#app',

  data() {
    return {
      //flag to show or hide the no result message
      noResult: false,
      //area code to use in the request
      areaCode: '',
      //results to display 
      listing: [], 
    };
  },

  methods: {
    // request handling
    onSubmit(event) {
      if(event) event.preventDefault();
      
      var opts = {
        method: 'get',
        headers: {
          'content-type': 'application/json',
        }
      };

      // using new javascript fetch API
      fetch(`/results/${this.areaCode}`, opts).then((resp) => {
        return resp.ok ? resp.json() : null;
      }).then((data) => {
        this.noResult = !!!data;
        this.listing = data ? data.listing : [];
      });
    },

    // resetting the noResult flag when the input is focused
    onFocus() {
      this.noResult = false;
    },

    // currency formatting
    format(number) {
      return formatter.format(number);
    }
  },
});
