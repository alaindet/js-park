$(document).ready(function () {
  $("#the_form").on("submit", function (e) {

    // Prevent default
    e.preventDefault();

    // Define inputs
    var inputs = ["m0", "c0_sum", "c"];

    // Define votes
    var votes = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

    // Will hold data
    var data = {};

    // Will hold predictions
    var predictions = {};

    // Init error flag
    var error = false;

    // Get data from DOM
    for (var i = 0, len = inputs.length; i < len; ++i) {

      // Get current value
      var value = parseFloat($("#" + inputs[i]).val().replace(",", "."));

      // ERROR: Invalid input
      if (isNaN(value)) {
        error = true;
        break;
      }

      // Everything's ok, store value
      else {
        data[inputs[i]] = value;
      }
    }

    // ERROR: Input invalidi ----------------------------------------------
    if (error) {
      alert("Hai inserito degli input non validi, ritenta.");
      return;
    }

    // Calculate new credits sum
    data.c_sum = data.c0_sum + data.c;

    // Will hold final results HTML string
    var results = "<ul><strong>Voto__Vecchia Media__Nuova Media__Variazione</strong>";

    // Predict new averages
    for (var i = 0, len = votes.length; i < len; ++i) {

      // Calculate average and variation
      _average = newAverage(data.m0, data.c0_sum, votes[i], data.c);
      _variation = _average - data.m0;

      // Store them
      predictions[votes[i]] = {
        average: _average.toFixed(4),
        variation: _variation.toFixed(4)
      };

      // Calculate sign
      var sign = predictions[votes[i]].variation >= 0 ? "+" : "";

      // Add to results
      results += "<li>" + votes[i] + "__" + data.m0.toFixed(4) + "__" + predictions[votes[i]].average + "__" + sign + predictions[votes[i]].variation + "</li>";
    }

    // Close results HTML string
    results += "</ul>";

    // Add results to #results
    $("#results").html(results).show({
      duration: 150,
      start: function () {
        $("#results").removeClass("hidden");
      }
    });
  });

  $("#the_reset").on("click", function () {
    $("#results").html("").addClass("hidden");
  });

  // Helper function
  function newAverage(m0, c0, v, c) {
    return (m0 * c0 + v * c) / (c0 + c);
  }
});
