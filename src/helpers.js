import $ from 'jquery'

$(document).ready(function () {
  $('.link-collapse').click(function () {
    $(this).find('.arrow-collapse').toggleClass('rotated')
  })
  $('.ql-container').each(function () {
    $(this).append($(this).prev('.ql-toolbar'))
  })
  $(document).on('mouseenter mouseleave', '.field', function () {
    $(this).find('.ion-edit, .ti-pencil').toggleClass('text-secondary')
  })
  $(document).on('click', '.field', function () {
    $(this).find('textarea, input').attr('readonly', false)
  })
  $(document).on('click', '.link-collapse', function () {
    $(this).find('.arrow-collapse').toggleClass('rotated')
  })
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
})
