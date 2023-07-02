$(document).ready(function(){
    $('.cart-button').on('click',function(){
        var st = $(this).parent().find('.stock').attr('data-st');
        $('#qtyModal .add-cart').attr('data-st', st).attr('data-id', $(this).attr('data-id'))
    })
    $('.book-tool').on('click',function(){
        debugger;
        var st = $(this).parent().find('.stock').attr('data-st');
        $('#rentModal .add-rent').attr('data-st', st).attr('data-id', $(this).attr('data-id'))
    })
    $('#rentModal .add-rent').on('click', function(){
        var qty = $('#rentModal #quntity').val();
        var addr = $('#rentModal #address').val();
        var d = $('#rentModal #date').val();
        var dur = $('#rentModal #dur').val();
        var du = $('#rentModal #dur-unit').val();
        var item = $(this).attr('data-id');
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
                    alert("Successfully added to cart");
                    $('#rentModal input').val('');
                    $('#rentModal').modal('toggle');
                }
            },
            error: function (err) {
                console.log(err)
            }
        });
    })
    $('#qtyModal .add-cart').on('click',function(){
        if(parseInt($(this).parent().find('#quantity').val()) > parseInt($(this).attr('data-st'))) {
            alert('Quantity should be less than or equal to ' + $(this).attr('data-st'));
        }
        else {
            var qty = parseInt($(this).parent().find('#quantity').val());
            var type = $(this).attr('data-type');
            var item = $(this).attr('data-id');
            console.log(qty);
            console.log(type);
            console.log(item);
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
});