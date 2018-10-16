var APP = {

  data: {
    int: 0,
    romans: {
      min: 1,
      max: 3999,
      units: {
        1000: "M",
        500: "D",
        100: "C",
        50: "L",
        10: "X",
        5: "V",
        1: "I"
      }
    }
  },

  components: {
    input: {
      selector: '.the-input',
      select: function() {
        return document.querySelector(this.components.input.selector);
      }
    },
    output: {
      selector: '.the-output',
      select: function() {
        return document.querySelector(this.components.output.selector);
      },
      update: function($input) {
        this.components.output.select.call(this)
          .innerHTML = $input;
      }
    }
  },

  methods: {
    integerToRoman: function ($int) {

      // Check the input
      if ($int < this.data.romans.min) {
        return "<span class='error'>Input is too small!</span>";
      }
      if ($int > this.data.romans.max) {
        return "<span class='error'>Input is too big!</span>";
      }

      // Split integer into digits
      var digits = this.methods.splitDigits.call(this, $int);

      console.log(digits);

      // Convert integer digits to roman number
      return this.methods.digitsToRoman.call(this, digits);
    },

    splitDigits: function($int) {
      return $int.toString().split('').map(function(digit, pos, digits) {
        return {
          digit: parseInt(digit),
          power: 10 ** (digits.length - pos - 1)
        };
      });

    },

    digitsToRoman: function ($digits) {

      // Grab the roman units
      var romanUnits = this.data.romans.units;

      return $digits.map(function($current) {

        var units = {
          int: $current.digit,
          roman: romanUnits[$current.power],
          romanTimes5: romanUnits[$current.power * 5],
          romanTimes10: romanUnits[$current.power * 10]
        };

        // Ex.: I, II, III
        if (units.int == 1 || units.int == 2 || units.int == 3) {
          var output = '';
          for (i = 0; i < units.int; i++) {
            output += units.roman;
          }
          return output;
        }

        // Ex.: IV
        else if (units.int == 4) {
          return units.roman + units.romanTimes5;
        }

        // Ex.: V
        else if (units.int == 5) {
          return units.romanTimes5;
        }

        // Ex.: VI, VII, VIII
        else if (units.int == 6 || units.int == 7 || units.int == 8) {
          var output = units.romanTimes5;
          for (i = 0, len = units.int - 5; i < len; i++) {
            output += units.roman;
          }
          return output;
        }

        else if (units.int == 9) {
          return units.roman + units.romanTimes10;
        }

      }).join('');
    }
  },

  handlers: {
    onChangeInput: function() {
      // Read the input
      var int = this.components.input.select.call(this).value;
      
      // Convert input to roman number
      var roman = this.methods.integerToRoman.call(this, int);

      // Update output view
      this.components.output.update.call(this, roman);
    }
  },

  bootstrap: function() {

    // Write min and max values
    document.querySelector('.min').innerHTML = this.data.romans.min;
    document.querySelector('.max').innerHTML = this.data.romans.max;

    // Bind converter on input change
    this.components.input.select.call(this)
      .oninput = this.handlers.onChangeInput.bind(this);
  }
};

APP.bootstrap();
