$(function(){
    $("#form-comment-add").show();
    $("#form-comment-edit").hide();
    $("#form-comment-add").on('submit', function(event){
        event.preventDefault();

        var productId = $(this).data('product');
        var comment = $("#input-comment-add").val();

        $.ajax({
            url: '/comments',   
            type: 'POST',
            data: {
                comment: comment,
                ProductId: productId
            },
            success: function(){
                location.reload();
            }
        });
    });

    $('#form-comment-edit').on('submit', function(event){
        event.preventDefault();

        var id = $("#input-comment-id").val();
        var comment = $("#input-comment-edit").val();

        $.ajax({
            url: '/comments/' + id,   
            type: 'PUT',
            data: {
                comment: comment
            },
            success: function(){
                location.reload();
            }
        });
    });

    $('.btn-comment-delete').on('click', function(){
        if (confirm('Are your sure to delete this comment?')){
            var id = $(this).data('id');

            $.ajax({
                url: '/comments/' + id,
                type: 'DELETE',
                success: function(){
                    location.reload();
                }
            });
        }
    });

    $(".btn-comment-edit").on('click', function(){
        $("#form-comment-add").hide();
        $("#form-comment-edit").show();

        var comment = $(this).data('comment');
        var id = $(this).data('id');

        $('#input-comment-edit').val(comment);
        $('#input-comment-id').val(id);
    });

    $(".btn-comment-cancel").on('click', function(){
        $("#form-comment-add").show();
        $("#form-comment-edit").hide();
    });
});