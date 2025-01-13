$(document).ready(function(){
    if(window.location.pathname === '/products') {
        $('.home-products').addClass('home-select');
        $('.home-inquiries').addClass('home-unselect');
        $('.home-about').addClass('home-unselect');
        $('.home-contactus').addClass('home-unselect');
    } 
    if(window.location.pathname === '/') {
        $('.home-products').addClass('home-select');
        $('.home-inquiries').addClass('home-unselect');
        $('.home-about').addClass('home-unselect');
        $('.home-contactus').addClass('home-unselect');
    } 
    if(window.location.pathname === '/inquiries') {
        $('.home-inquiries').addClass('home-select');
        $('.home-products').removeClass('home-select');
        $('.home-products').addClass('home-unselect');
        $('.home-orders').addClass('home-unselect');
        $('.home-contactus').addClass('home-unselect');
    } 
    if(window.location.pathname === '/about') {
        $('.home-about').addClass('home-select');
        $('.home-products').removeClass('home-select');
        $('.home-products').addClass('home-unselect');
        $('.home-inquiries').addClass('home-unselect');
        $('.home-contactus').addClass('home-unselect');
    } 
    if(window.location.pathname === '/contactus') {
        $('.home-contactus').addClass('home-select');
        $('.home-products').removeClass('home-select');
        $('.home-inquiries').addClass('home-unselect');
        $('.home-products').addClass('home-unselect');
        $('.home-about').addClass('home-unselect');
    } 

    $('.ri-arrow-left-s-line').click(function() {
        $('.parent-container').addClass('parent-container-min').removeClass('parent-container-max');
        $('h3.nav-text').removeClass('show');
        $('.ri-arrow-right-s-line').removeClass('hidden');
        $('span.app-name').removeClass('show');
        $('img.img-logo').addClass('hidden');
        $(this).addClass('hidden');
        $('.home-logo').addClass('home-logo-min').removeClass('home-logo-max');
        $('.home-tab').addClass('nav-min').removeClass('nav-exp');
        $('.product-container').addClass('nav-min').removeClass('nav-exp');
        $('.modal-buy').addClass('nav-min').removeClass('nav-exp');
        $('.order-content').addClass('nav-min').removeClass('nav-exp');
        $('.modal-orderUpdate').addClass('nav-min').removeClass('nav-exp');
        $('.modal-orderDelete').addClass('nav-min').removeClass('nav-exp');
    })

    $('.ri-arrow-right-s-line').click(function() {
        setTimeout(function(){
            $('.ri-arrow-left-s-line').removeClass('hidden');
            $('img.img-logo').removeClass('hidden');
        }, 300)
        $('span.app-name').addClass('show');
        $('h3.nav-text').addClass('show');
        $('.home-tab').addClass('nav-exp').removeClass('nav-min');
        $('.product-container').addClass('nav-exp').removeClass('nav-min');
        $('.modal-buy').addClass('nav-exp').removeClass('nav-min');
        $('.order-content').addClass('nav-exp').removeClass('nav-min');
        $('.modal-orderUpdate').addClass('nav-exp').removeClass('nav-min');
        $('.modal-orderDelete').addClass('nav-exp').removeClass('nav-min');
        $(this).addClass('hidden');
        $('.parent-container').addClass('parent-container-max').removeClass('parent-container-min');
        $('.home-logo').addClass('home-logo-max').removeClass('home-logo-min');
    })

    for(let i = 0; i < 6; i++) {
        $(`#buy${i}`).click(function() {
            $('.modal-buy').css('display','block');
        })
        $(`#detail${i}`).click(function() {
            $('.modal-details').css('display','block');
        })
        $(`#order-update${i}`).click(function() {
            e.preventDefault();
            $('.modal-orderUpdate').css('display','block');
        })
    }

    $('#cancel').click(function() {
        $('.modal-buy').css('display','none');
    })
    $('#close').click(function() {
        $('.modal-details').css('display','none');
    })

    if(window.location.pathname == '/order'){
       
        var value = ''; 
        const elem = $('td a.delete');
        elem.click(function () {
            $('.modal-orderDelete').css('display','block');
            var orderId = $(this).data('id');
            value = orderId
        })

        $(document).ready(function () {
            $('td a.order-update').click(function(e) {
                e.preventDefault();
                var orderId = $(this).data('id');
                $('.modal-orderUpdate').css('display','block');
                var dataArray = orderId.split(',');
                $('input[name="firstname"]').val(dataArray[0]);
                $('input[name="lastname"]').val(dataArray[1]);
                $('input[name="email"]').val(dataArray[2]);
                $('input[name="creditnumber"]').val(dataArray[3]);
                $('input[name="schedule"]').val(dataArray[4]);
                $('input[name="id"]').val(dataArray[5]);
            })
        })

        

        $('button#confirm').click(function() {
            var domain = window.location.origin;
            var request = {
                "url":`${domain}/api/deleteorder/${value}`,
                "method": "DELETE"
            }
            $.ajax(request)
            .done(function(response){
                $(document).ready(function(){
                    window.location.href = `${domain}/order`;
                });
            })
        })

        $('button#cancel').click(function() {
            $('.modal-orderDelete').css('display','none');
        })

        $('button#cancel').click(function() {
            var domain = window.location.origin;
            $(document).ready(function(){
                window.location.href = `${domain}/order`;
            });
            $('.modal-orderUpdate').css('display','none');
        })

        $('#add_order').submit(function(event) {
            var domain = window.location.origin;
            event.preventDefault();
            var unindexed_array = $(this).serializeArray();
            var data = {};
            
            $.map(unindexed_array, function(n,i) {
                data[n['name']] = n['value']
            })

            var request = {
                "url":`${domain}/api/updateorder/${data.id}`,
                "method": "PUT",
                "data":data
            }

            $.ajax(request).done(function(response){
                $(document).ready(function(){
                    window.location.href = `${domain}/order`;
                });
                $('.modal-orderUpdate').css('display','none');
            })
        })

    }
})