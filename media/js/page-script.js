$(function () {
    loadbar();
    setActive();

    $("#footer").load("footer.aspx");
    $("#coverletter").load("letter-ext.aspx");
   
    setTimeout(function () {
        //$('body').addClass('loaded'); //remove loading gif
        
        var wel = $("#welcome-message");

        $(".openWindow").bind("click", function () {
            wel.data("kendoWindow").center().open();
        });

        $(".closeWindow").click(function () {
            $(this).closest(".k-window-content").data("kendoWindow").close();
        });

    }, 1000);
});


function loadbar() {
    $("#nav").load("nav.aspx", setActive);
}


function setActive() {
    var obj = document.getElementById("nav").getElementsByTagName("a");

    for (var i = 0; i < obj.length; i++) {
        if (document.location.href.indexOf(obj[i].href) >= 0) {
            obj[i].className = "active";
        }

    }
}

function ppickerClose(v) {
    return v ? 'addClass' : 'removeClass';
}

$(document).on('input', '.closeicon', function () {
    $(this)[ppickerClose(this.value)]('x');
})

.on('mousemove', '.x', function (e) {
    $(this)[ppickerClose(this.offsetWidth - 18 < e.clientX - this.getBoundingClientRect().left)]('onX');
})

.on('touchstart click', '.onX', function (e) {
    e.preventDefault();
    $(this).removeClass('x onX').val('').change();
});