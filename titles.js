var id_title = 1; //FALTA ENVIAR UM POST PRO creation_titles.php por intermédio de um botão
// que vai permitir a criação de títulos
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
            $titleDeleted= $formTitleDelete.find("input[name='titleCreated']").val();
        $.ajax({
            url: "creation_titles.php",
            headers: {titleDeleted : $titleDeleted},
            type: "DELETE", function(){
            $formTitleDelete.find("input[name='titleCreated']").val("");
            }
        });
    });
});

//DEPOIS, PRECISO SUBSTITUIR O INPUT DE TEXTO POR INPUTS DE RADIO CUJOS VALORES SERÃO OS NOMES
// DOS TITULOS QUE ESTÃO NO BANCO DE DADOS