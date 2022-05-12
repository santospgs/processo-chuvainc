$(document).ready(function(){       
    $('.moreless-button').click(function(){
        $('.moretext').slideToggle();
        $(this).text() == '...ver mais' ? $(this).text('...ver menos') : $(this).text('...ver mais');       
    });

    $('.item-menu').click(function(){
        $('.item-menu').removeClass('active');
        $(this).addClass('active');
    });

    let topicsSource = './js/forum_data.json';

    fetch(topicsSource)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        showCards(response);

        $('.card-discussion:not(".button")').click(function(){
            $('.comment-created').remove();
            let idElement = $(this).attr('id');
            let lengthAnswers = response[idElement-1].answers.length;
            let answersList = response[idElement-1].answers;
            //console.log(answersList)

            answersList.forEach((c) => {
                let comment = $('<div></div>').addClass('comment-created');
                let userName = $('<p></p>').html(c.userName).addClass('user-name');
                let answerText = $('<p></p>').html(c.answerText).addClass('answer-text');

                if (c.userType != 'User'){
                    comment.addClass('comment-highlight')

                    let spanUserType = $('<span></span>').addClass('user-type');
                    let userType = $('<p></p>').html(c.userType)
                    let checkIcon = $('<i class="fa fa-check" aria-hidden="true"></i>')

                    spanUserType.append(userType,checkIcon)

                    comment.append(userName, spanUserType, answerText);
                } else {
                    comment.append(userName, answerText);
                }
                
                $(this).append(comment);
               //$(comment).insertAfter(this);

            })

            /* for (let i = 0; i < lengthAnswers; i++){
                let comment = $('<div>Comentário</div>').addClass('comment-created')
                 $(this).append(comment)
            } */
        })
    })

    let showCards = (data) => { 
        data.forEach( (newCard) => { createCard(newCard) } );
    }

    let createCard = (card) => {
        const articleWrapper = $('<div></div>').addClass('article-wrapper')
        const articleCard = $('<article></article>').attr('id', card.id).addClass('card-discussion');

        const headerCard = $('<header></header>').addClass('card-discussion-header');
        const headerCardTitle = $('<h4></h4>').html(card.title);
        const headerCardAuthor = $('<p></p>').html(card.author);

        const contentCard = $('<p></p>').addClass('card-discussion-content').html(card.content);

        const footerCard = $('<footer></footer>');
        const footerCardOptions = '<i class="fa fa-ellipsis-v fa-lg" aria-hidden="true"></i>';
        const footerLikeButton = $('<button></button>').addClass('button').html('<i class="fa fa-heart" aria-hidden="true"></i>');
        const likesCount = $('<p></p>').addClass('likes').html(`${card.likes} likes`);
        const answersCount = $('<p></p>').addClass('likes').html(`${card.answers.length} respostas`);

        $(headerCard).append(headerCardTitle,headerCardAuthor);         
        $(footerCard).append(footerCardOptions,footerLikeButton,likesCount,answersCount);

        $(articleWrapper).append(headerCard,contentCard,footerCard);
        $(articleCard).append(articleWrapper)

        $('#discussion .section-content').append(articleCard);
    }    

    $('#addNewTopicButton').click(function(){
        $('#discussion-header').hide();
        $('#new-topic-form').show().addClass('active');
    });

    $('.btn-bold, .btn-italic').click(function(){
        $(this).toggleClass('text-effect');
    });

    $('#btn-send-new-topic').click(function(){
        $('.required-msg').remove() 
        if($('#topicSubject').val() == ''){                       
            $('<b>campo obrigatório</b>').addClass('required-msg').insertAfter($('#topicSubject'));
        } else if ($('#topicContent').val() == ''){
            $('<b>campo obrigatório</b>').addClass('required-msg').insertAfter($('.newtopic-content-wrapper'));
        } else {      
            const articleCard = $('<article></article>').addClass('card-discussion new-topic');

            const overlayCard = $('<span></span>').addClass('overlay-card');
            const overlayIcon = $('<i class="fa fa-check" aria-hidden="true"></i>');
            const overlayTitle = $('<p><b>Aguardando feedback dos autores</b></p>');
            //const overlayEdit = $('<a>Editar tópico</a>').addClass('edit-link');
            const overlayEdit = $('<a>Editar tópico</a>').addClass('edit-link')

            overlayCard.append(overlayIcon,overlayTitle,overlayEdit);

            const wrapperCard = $('<div></div>').addClass('wrapper-card') ;       

            const headerCard = $('<header></header>').addClass('card-discussion-header');
            const headerCardTitle = $('<h4></h4>').html($('#topicSubject').val());
            const headerCardAuthor = $('<p></p>').html('Autor do tópico');

            const contentCard = $('<p></p>').addClass('card-discussion-content').html($('#topicContent').val());

            const footerCard = $('<footer></footer>');
            const footerCardOptions = '<i class="fa fa-ellipsis-v fa-lg" aria-hidden="true"></i>';
            const footerLikeButton = $('<button></button>').addClass('button').html('<i class="fa fa-heart" aria-hidden="true"></i>');
            const likesCount = $('<p></p>').addClass('likes').html(`0 likes`);
            const answersCount = $('<p></p>').addClass('likes').html(`0 respostas`);

            $(headerCard).append(headerCardTitle,headerCardAuthor);         
            $(footerCard).append(footerCardOptions,footerLikeButton,likesCount,answersCount);

            $(wrapperCard).append(headerCard,contentCard,footerCard);

            $(articleCard).append(overlayCard,wrapperCard);
            
            $(articleCard).insertBefore('article#1'); 
            $('#topicSubject').val('');
            $('#topicContent').val(''); 

            newTopicAdded();
        }
    });

    let newTopicAdded = () => {
        $('#discussion-header').show();
        $('#new-topic-form').hide();

        $('#discussion-header h3').html('Seu tópico foi enviado com sucesso! :D');
        $('#img-wrapper').hide();
        
        $('#discussion-header p').html('Agradecemos por sua contribuição, uma notificação será enviada ao seu email assim que seu tópico for respondido!');
        $('#discussion-header .edit-link').remove()
        $('<a>Descubra outros trabalhos!</a>').insertAfter('#discussion-header p').addClass('edit-link');
        $('#addNewTopicButton').html('criar novo tópico');
    }
    
    $('.menu-toggle').click(function(){
        $('aside').toggleClass('hide-menu')
        $('.menu-toggle').toggleClass('hide-menu-btn-slide')
    })    
});

