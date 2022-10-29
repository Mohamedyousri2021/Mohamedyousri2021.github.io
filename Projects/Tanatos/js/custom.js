/*global $, alert, console */
$(function () {
  'use strict'; 
  //trigger nice scroll
  $('html').niceScroll({
    cursorcolor: '#f7600e',
    cursorwidth: 10,
    cursorborder: '1px solid #f7600e'
  });
  //change header height 
  $('.header').height($(window).height());

  //scroll to features
  $('.header .arrow i').click( () => {
    $('html, body').animate({
      scrollTop: $('.features').offset().top
    }, 1000)
  });

  $('.hire').click( () => {
    $('html, body').animate({
      scrollTop: $('.our-team').offset().top
    }, 1000)
  });

  $('.works').click( () => {
    $('html, body').animate({
      scrollTop: $('.our-work').offset().top
    }, 1000)
  });

  //show hiddden items
  $('.show-more ').click( () => {
    $('.our-work .hidden').fadeIn();
  });

  //check testimonials
  var leftArrow = $('.testimonials .fa-chevron-left');
  var rightArrow = $('.testimonials .fa-chevron-right');
  function checkClients () {
    $('.client:first').hasClass('active') ? leftArrow.fadeOut() : leftArrow.fadeIn();
    $('.client:last').hasClass('active') ? rightArrow.fadeOut() : rightArrow.fadeIn();
  }
  checkClients();

  $('.testimonials i').click( function () {
    if ($(this).hasClass('fa-chevron-right')) {
      $('.testimonials .active').fadeOut(100, function () {
        $(this).removeClass('active').next('.client').addClass('active').fadeIn();
        checkClients();
      });
    }
     else {
      $('.testimonials .active').fadeOut(100, function () {
        $(this).removeClass('active').prev('.client').addClass('active').fadeIn();
        checkClients();
      });
    }
  });
});
// don't use arrow fuction wtih this keyword  "copyright omar mohamed"
// const nav = document.querySelector('.header')
// console.log(getComputedStyle(nav).display);