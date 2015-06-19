var $ = require('jquery-browserify');

var ToolBar = require('./includes/toolbar/script.js');

function initComponents() {
	ToolBar.initialize($('#toolbar'));
};

$(function() {
	initComponents();
});