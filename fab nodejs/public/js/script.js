$(document).ready(function(){
    $('.cart-button').on('click',function(){
        var st = $(this).parent().find('.stock').attr('data-st');
        $('#qtyModal .add-cart').attr('data-st', st).attr('data-id', $(this).attr('data-id'))
    })
    $('.book-tool').on('click',function(){
        var st = $(this).parent().find('.stock').attr('data-st');
        $('#rentModal .add-rent').attr('data-st', st).attr('data-id', $(this).attr('data-id'))
    })
    $('.edit-profile').on('click', function(){
        if($('#password').val().trim().length == 0) {
            alert("Password field is required")
            return false;
        }
        else if($('#password').val().trim() != $('#conf-password').val().trim()) {
            alert("Password and Confirm password sholud be same");
            return false;
        }
    })
    $('#rentModal .add-rent').on('click', function(){
        var qty = $('#rentModal #quantity').val();
        var addr = $('#rentModal #address').val();
        var d = $('#rentModal #date').val();
        var dur = $('#rentModal #dur').val();
        var du = $('#rentModal #dur-unit').val();
        var item = $(this).attr('data-id');
        var x = 1;
        if(!qty || qty == "" || parseInt(qty) > parseInt($(this).attr('data-st'))) {
            alert('Quantity should be less than or equal to ' + $(this).attr('data-st'));
        }
        else if(addr.trim() == ""){
            alert('Enter valid address');
        }
        else if(d.trim() == "" || new Date() > new Date(d)){
            alert('Enter valid Date');
        }
        else if(!dur || dur == "" || parseInt(dur) <=0 ) {
            alert('Enter valid Duration');
        }
        else {
            $.ajax({
                url: '/addrent',
                data: { 
                    q: qty,
                    i: item,
                    a: addr,
                    d: d,
                    dur: dur,
                    du: du
                },
                type: 'post',
                dataType: 'json',
                async: true,
                success: function (doc) {
                    if(doc.msg == "success") {
                        alert("Tool Successfully booked");
                        $('#rentModal input').val('');
                        $('#rentModal').modal('toggle');
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            });
        }
    })
    $('#qtyModal .add-cart').on('click',function(){
        if(parseInt($(this).parent().find('#quantity').val()) > parseInt($(this).attr('data-st'))) {
            alert('Quantity should be less than or equal to ' + $(this).attr('data-st'));
        }
        else {
            var qty = parseInt($(this).parent().find('#quantity').val());
            var type = $(this).attr('data-type');
            var item = $(this).attr('data-id');
            $.ajax({
                url: '/addcart',
                data: { 
                    q: qty,
                    i: item,
                    t: type
                 },
                type: 'post',
                dataType: 'json',
                async: true,
                success: function (doc) {
                    if(doc.msg == "success") {
                        alert("Successfully added to cart");
                        $('#qtyModal input').val('');
                        $('#qtyModal').modal('toggle');
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            });
        }
    })
    $('.register').on('click', function() {
        if(!$('#nameInput').val() || $('#nameInput').val().trim().length <3) {
            alert("Enter valid name");
            return false;
        }
        else if(!$('#addressInput').val() || $('#addressInput').val().trim().length <3) {
            alert("Enter valid Address");
            return false;
        }
        else if($('#genderSelect').val() == '-1') {
            alert("Select Gender");
            return false;
        }
        else if(!$('#dobInput').val() || new Date($('#dobInput').val()) >= new Date()) {
            alert("Enter valid Date");
            return false;
        }
        else if(!$('#addressInput').val() || $('#addressInput').val().trim().length <3) {
            alert("Enter valid Address");
            return false;
        }
        else if(!$('#addressInput').val() || $('#addressInput').val().trim().length <3) {
            alert("Enter valid Address");
            return false;
        }
    })
});