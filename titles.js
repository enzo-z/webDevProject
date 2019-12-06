$(document).ready(function () {  
    //Creation of titles
    $("#form-title-create").submit(function (e) { 
        e.preventDefault();
        var $formTitleCreate = $(this),
            $titleCreated = $formTitleCreate.find("input[name='titleCreated']").val();
        $.post('creation_titles.php',{titleCreated : $titleCreated}, function(){
            $formTitleCreate.find("input[name='titleCreated']").val("");
        });
    });
    // Deletion of titles
    $("#form-title-delete").submit(function (e) { 
        e.preventDefault();
        var $formTitleDelete = $(this),
            $titleDeleted= $formTitleDelete.find("input[name='titleDeleted']").val();
            console.log("SUCESSO?"+titleDeleted);
        $.post('creation_titles.php', {titleDeleted : $titleDeleted, type : 'delete'}, function(response){
            if(response == 'error'){ ////Poderia substituir isso por um modal, e esse modal teria algo para deletar todas as anotações do título
                alert("VOCÊ SÓ PODE DELETAR UM TÍTULO/CATEGORIA SE ELE NÃO POSSUIR ANOTAÇÕES!");
            }
            $formTitleDelete.find("input[name='titleDeleted']").val("");
        });
    });
});