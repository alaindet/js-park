var app = {
  
  lightbulb: {
    select: function() {
      return $('.lightbulb');  
    },
    state: function(el) {
      return el.hasClass('on');
    },
    on: function(el) {
      el.removeClass('off').addClass('on')
    },
    off: function(el) {
      el.removeClass('on').addClass('off')
    },
    toggle: function(el) {
      this.state(el) ? this.off(el) : this.on(el);
    }
  },
  
  switch: {
    selectAll: function() {
      return $('.switch');
    },
    on: function(icon) {
      icon.removeClass('off').addClass('on').text("I");
    },
    off: function(icon) {
      icon.removeClass('on').addClass('off').text("O");
    },
    toggle: function(icon) {
      icon.hasClass('on') ? this.off(icon) : this.on(icon);
    }
  },
  
  // Trigger custom events (read .trigger() docs on jquery.com)
  customEvent: function(docEvent) {
    $(document).trigger(
      docEvent.data, // Custom event
      [docEvent] // Original event
    );
  },
  
  handlers: {
    
    bootstrapApp: function () {

      // Set lightbulb to off state
      this.lightbulb.select().addClass('off');

      // Set all switches to off state
      this.switch.selectAll().each(function () {
        $('.switch-icon', $(this)).addClass('off').text('O');
      });
    },

    onSwitchClick: function(docEvent, switchEvent) {
      this.lightbulb.toggle(this.lightbulb.select());
      this.switch.toggle($('.switch-icon', $(switchEvent.currentTarget)));
    }

  },
};

$(document).ready(function() {

  // Register custom events
  $(document)
    .on('app:bootstrap', app.handlers.bootstrapApp.bind(app))
    .on('app:switch-clicked', app.handlers.onSwitchClick.bind(app))

  // Map events to custom events
  $(document)
    .on('click', '.switch', 'app:switch-clicked', app.customEvent)
  
  // Bootstrap the app
  app.customEvent({data: 'app:bootstrap'});
});
