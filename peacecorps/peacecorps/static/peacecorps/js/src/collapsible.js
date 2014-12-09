'use strict';

var $ = require('jquery');

var Collapsible = function($root) {
  if ($root.length < 1) {
    throw new Error('selector missing');
  }
  this.el = $root[0];
  this.$el = $root;
  this.ccCollapsible = '.js-collapsibleItem';
  // create shortcut to finding things within root.
  this.$ =  function(selector) {
    return this.$el.find(selector);
  };
  this.init.apply(this, arguments);
};

Collapsible.prototype.init = function(root, $control) {
  var self = this;
  this.id = this.$el.attr('id') || '';
  this.hidden = true;
  this.$control = $control;
  if (this.$control) {
    this.$control.on('click', function(ev) {
      ev.preventDefault();
      self.hidden = false;
      self.render();
    });
  }
};


// TODO move to more general util
Collapsible.prototype.hideMultiple = function($els) {
  $els.each(function() {
    var $el = $(this);
    $el.attr('aria-hidden', true);
  });
  // TODO fix global access.
  $('[aria-expanded=true]').attr('aria-expanded', false);
};

Collapsible.prototype.render = function() {
  // TODO fix global access.
  this.hideMultiple($('body').find(this.ccCollapsible));
  this.$el.attr('aria-hidden', this.hidden);
  this.$control && this.$control.attr('aria-expanded', true);
};

module.exports = Collapsible;
