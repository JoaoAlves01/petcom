$(document).ready(function(){

    $(".box__field > input, .box__field > textarea").focusin(function()
	{
		var fieldClick = $(this),
		field = fieldClick.parents(".box__field");

		if(!field.hasClass("box__field--float")){
			field.addClass("box__field--float");
		}
	});

	$(".box__field > input, .box__field > textarea").focusout(function()
	{
		var fieldClick = $(this),
		field = fieldClick.parents(".box__field");

		setTimeout(function(){

			if(fieldClick.val().length == 0)
			{
				field.removeClass("box__field--float");
			}

		}, 100);
	});

    $(".menu__item").click(function(event){
		let scroll = $(this).find('a').attr('href');

		$("html, body").animate({scrollTop:$(scroll).offset().top - 30}, 1500);
	});
});