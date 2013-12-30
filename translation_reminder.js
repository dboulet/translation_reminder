/* Javascript for Translation Reminder module */
(function ($) {

Drupal.behaviors.translation_reminder = function () {
  $(".node-form select#edit-language").change(function () {
    lang = $("option:selected", this).val();
    Drupal.translation_reminder.sync(lang);
    $("#translation-reminder-options input").val(['']);
  });
  if ($("#translation-reminder-options .warning").length == 0) {
    $('<div class="warning">' + Drupal.t('Translation is disabled for language neutral content.') + '</div>').appendTo("#translation-reminder-options").hide();
  }
  var lang = $(".node-form select#edit-language option:selected").val();
  Drupal.translation_reminder.sync(lang);
};

Drupal.translation_reminder = {
  'sync': function (lang) {
    if (lang != '') {
      $("#translation-reminder-options").removeClass("disabled").find(".warning").hide().end().find("input.form-radio").each(function () {
        if ($(this).val() == lang) {
          $(this).attr('disabled', 'disabled').parent().hide();
        }
        else {
          $(this).removeAttr('disabled').parent().show();
        }
      });
    }
    else {
      $("#translation-reminder-options").addClass("disabled").find(".warning").show().end().find("input.form-radio").attr('disabled', 'disabled').parent().show();
    }
  }
};

}) (jQuery);
