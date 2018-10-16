var app = {
  
  state: {
    players: [
      { symbol: 'x', score: 0 },
      { symbol: 'o', score: 0 },
    ],
    currentPlayer: {},
    board: []
  },

  components: {
    alert: {
      selectors: {
        alert: '.alert'
      },
      select: function() {
        return document.querySelector(this.components.alert.selectors.alert);
      },
      empty: function() {
        var alert = this.components.alert.select.call(this);
        alert.classList.remove('alert-success');
        alert.classList.remove('alert-info');
        alert.classList.remove('alert-danger');
        alert.innerHTML = null;
      },
      set: function($args) {
        $args.msg = $args.msg || '';
        $args.type = $args.type ? 'alert-'+$args.type : 'alert-info';
        var alert = this.components.alert.select.call(this);
        alert.classList.add($args.type);
        alert.innerHTML = $args.msg;
      }
    },
    cells: {
      count: 9,
      selectors: {
        cell: '.cell',
        cellX: '.cell-x',
        cellO: '.cell-o',
        cellHoverX: '.cell-hover-x',
        cellHoverO: '.cell-hover-o'
      },
      select: function($id) {
        if ($id) {
          return document.querySelector($id);
        } else {
          var cells = this.components.cells.selectors.cell;
          return document.querySelectorAll(cells);
        }
      },
      empty: function() {
        this.components.cells.selectAll.call(this).forEach(function(cell) {
          cell.innerHTML = null;
          cell.classList.remove('cell-hover-o', 'cell-hover-x', 'o', 'x');
        });
      },
      update: function() {
        var board = this.state.board;
        for (var i = 0, len = this.components.cells.count; i < len; i++) {
          var symbol = this.state.board[i];
          var cell = this.components.cells.select.call(this, '#cell-'+(i+1));
          cell.innerHTML = symbol;
          cell.classList.remove('cell-hover-o', 'cell-hover-x');
          if (symbol) {
            cell.classList.add('cell-hover-'+symbol);
          }
        }
      }
    },
    scores: {
      selectors: {
        scores: '.score-value',
        x: '.score-x',
        o: '.score-o'
      },
      select: function($symbol) {
        var selectors = this.components.scores.selectors;
        if ($symbol) {
          return document.querySelector(selectors[$symbol]);
        } else {
          return document.querySelectorAll(selectors.scores);
        }
      },
      update: function() {
        var scores = this.state.players.map(function(p) { return p.score });
        var scoreElements = this.components.scores.select.call(this);
        scores.forEach(function(score, i) {
          scoreElements[i].innerHTML = score;
        });
      }
    },
    turn: {
      selectors: {
        turn: '.turn-value'
      },
      select: function() {
        var selector = this.components.turn.selectors.turn;
        return document.querySelector(selector);
      },
      update: function() {
        var turn = this.components.turn.select.call(this);
        var symbol = this.state.currentPlayer.symbol;
        turn.innerHTML = symbol.toUpperCase();
        turn.classList.remove('x', 'o');
        turn.classList.add(symbol);
      }
    },
    reset: {
      selectors: {
        reset: '.reset-game'
      },
      select: function () {
        var selector = this.components.reset.selectors.reset;
        return document.querySelector(selector);
      }
    }
  },

  game: {
    reset: function($args) {
      // Scrap all data, empty the scores
      if ($args && $args.all) {
        this.game.resetState.call(this, $args);
        this.components.scores.update.call(this);
      }
      // Scrap data but preserve scores and alert! (for the next game)
      else {
        this.game.resetState.call(this);
        this.components.alert.empty.call(this);
      }
      this.components.cells.update.call(this);
      this.components.turn.update.call(this);
    },
    resetState: function($args) {

      // Reset scores as well
      if ($args && $args.all) {
        this.state.players.forEach(function(p) { p.score = 0 });
      }

      // Reset turn player
      this.state.currentPlayer = this.state.players[0];

      // Reset board
      this.state.board = Array(this.components.cells.count).fill(null);
    },
    addVictory: function($symbol) {
      var p = this.state.players.find(function(p) {return $symbol == p.symbol});
      var el = this.components.scores.select.call(this, p.symbol);
      p.score += 1;
      el.innerHTML = p.score;
    },
    readBoard: function() {
      var cells = this.components.cells.select.call(this);
      this.state.board = Array.prototype.map.call(cells, function(cell) {
        return cell.innerHTML.toLowerCase();
      });
    },
    hasGameEnded: function() {

      // Get current symbol and board state
      var current = this.state.currentPlayer;
      var s = current.symbol;
      var b = this.state.board;

      // Check victory
      if (
        // Rows
        (b[0] == s && b[1] == s && b[2] == s) ||
        (b[3] == s && b[4] == s && b[5] == s) ||
        (b[6] == s && b[7] == s && b[8] == s) ||
        // Columns
        (b[0] == s && b[3] == s && b[6] == s) ||
        (b[1] == s && b[4] == s && b[7] == s) ||
        (b[2] == s && b[5] == s && b[8] == s) ||
        // Diagonals
        (b[0] == s && b[4] == s && b[8] == s) ||
        (b[2] == s && b[4] == s && b[6] == s)
      ) {
        return {
          winner: current,
          alert: {
            msg: 'Player ' + s + ' won!',
            type: 'success'
          }
        };
      }

      // Check for a tie (no empty cells)
      if (!b.filter(function (i) { return !i; }).length) {
        return {
          alert: {
            msg: 'Tie!',
            type: 'info'
          }
        };
      }
      
    },
    nextTurn: function() {
      var thisApp = this;
      thisApp.state.currentPlayer = thisApp.state.players.find(function(player) {
        return player.symbol !== thisApp.state.currentPlayer.symbol;
      });
      thisApp.components.turn.update.call(thisApp);
    }
  },

  handlers: {
    onClickCell: function(e) {

      // Select clicked cell
      var cell = e.target;

      // Check if cell is not empty
      if (cell.innerHTML) {
        this.components.alert.set.call(this, {
          msg: "There's already another symbol here.",
          type: 'danger'
        });
        return;
      }

      // Put the symbol
      var symbol = this.state.currentPlayer.symbol;
      cell.innerHTML = symbol.toUpperCase();
      cell.classList.add(symbol);

      // Read board
      this.game.readBoard.call(this);

      // Check game end
      var end = this.game.hasGameEnded.call(this);
      if (end) {

        // Update winner's score
        if (end.winner) {
          this.game.addVictory.call(this, end.winner.symbol);
        }

        // Show alert
        this.components.alert.set.call(this, {
          msg: end.alert.msg,
          type: end.alert.type
        });

        // Reset the game (preserve the scores)
        this.game.reset.call(this);
      }

      // Go on playing...
      this.game.nextTurn.call(this);
    },
    onClickReset: function() {
      this.game.reset.call(this, { all: true });
    }
  },

  bootstrapApp: function() {

    // Store the app reference
    var thisApp = this;

    // Bind click handlers to board cells
    thisApp.components.cells.select.call(thisApp).forEach(function(cell) {
      cell.addEventListener('click', thisApp.handlers.onClickCell.bind(thisApp));
    });

    // Bind click handler to reset button
    thisApp.components.reset.select.call(thisApp)
      .addEventListener('click', thisApp.handlers.onClickReset.bind(thisApp));

    // Reset the game (bind context and reset all including scores)
    thisApp.game.reset.call(thisApp, {all: true});
  }
};

// Bootstrap the app!
app.bootstrapApp()
