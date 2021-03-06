function del(id){ //Botão de delete card (DELETE)
    console.log(id);
    $.ajax({
      url: 'card_services.php',
      headers: {id : id},
      type: 'DELETE',
      success: function(response){
        console.log(response);
        show_cards(current_id_title);
      }
    });
  }
  function update(id){ //Botão de alterar card (UPDATE)
    console.log(id);
    $('#form-update').submit(function(event){
      event.preventDefault();
      var $form = $(this),
        title_name = $form.find("input[name='titulo']").val();
        theme = $form.find("input[name='theme']").val();
        anotation = $form.find("textarea[name='anotation']").val();
      $.get('titles_services.php', {title_name : title_name}, function(response){
        if(response){
          id_title = response;
          //alterar
          $.post('card_services.php', {id : id, theme : theme, anotation : anotation, id_title : id_title, cond : 42}, function(){
            $form.find("input[name='titulo']").val("");
            $form.find("input[name='theme']").val("");
            $form.find("textarea[name='anotation']").val("");
            document.location.reload();
          });
        }else{
          alert("Por favor, entre com uma categoria já criada");
        }
      });
    });
  }
  function show_cards(id, first = false){ //Mostrar cartas (READ)
    $.getJSON('card_services.php', {current_id_title : id}, function(response){
      let card = "";
      $.each(response, function(key, val){
        if(val != "response"){
          card += "<div class='col s4'><div class='card blue-grey darken-1'><div class='card-content white-text'><span class='card-title'>" + val['tema'] + "</span><p>" + val['texto'] + "</p></div><div class='card-action'><a name='edit' onclick='update(" + val['id'] + ")' class='waves-effect waves-light modal-trigger' href='#modal-form-update'>Editar</a><a name='delete' onclick='del(" + val['id'] + ")'>Deletar</a></div></div></div>";
        }
      });
      if(first == true){
        $('#schedule').append(card);
      }else{
        $('#schedule').html(card);
      }
    });
  }
  
  //Pequena gambiarra para os botões!
  var current_id_title = 1;
  var current_id_title2 = 1;
  
  $(document).ready(function(){ //Função necessária para manipulação da DOM pelo JQuery
    $('.modal').modal();
    $('.fixed-action-btn').floatingActionButton();
    show_cards(current_id_title, true);
    $.get('titles_services.php', {id_title : current_id_title}, function(response){
      $('#title_name').text(response);
  });
    //Botão para ir passando pelos títulos/categorias
    $('#add').click(function(){       
      $.getJSON('titles_services.php', function(response){
        if(current_id_title2 < response.length){
          $('#title_name').text(response[current_id_title2]['nome']);
          show_cards(response[current_id_title2]['id']);
          current_id_title2 = current_id_title2 + 1;
        }
        else{
          current_id_title2 = 0;
          $('#add').click();
        }
      });
    });
    //Formulário de criação de card/anotação
    //Obs: Uma coisa que eu poderia ter feito melhor era colocar inputs type='radio', com valores dos titulos...
    $('#form').submit(function(event){
      event.preventDefault();
      var $form = $(this),
        title_name = $form.find("input[name='titulo']").val();
        theme = $form.find("input[name='theme']").val();
        anotation = $form.find("textarea[name='anotation']").val();
      $.get('titles_services.php', {title_name : title_name}, function(response){
        if(response){
          id_title = response;
          $.post('card_services.php', {title_name : title_name, theme : theme, anotation : anotation, id_title : id_title}, function(){
            show_cards(id_title);
            $form.find("input[name='titulo']").val("");
            $form.find("input[name='theme']").val("");
            $form.find("textarea[name='anotation']").val("");
          });
        }else{
          alert("Por favor, entre com uma categoria já criada");
        }
      });
    });
  });  