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
    })

    let showCards = (data) => { 
        data.forEach( (newCard) => { createCard(newCard) } );
    }

    let createCard = (card) => {
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

        $(articleCard).append(headerCard,contentCard,footerCard);

        $('#discussion .section-content').append(articleCard);
    }

    $('#addNewTopicButton').click(function(){
        $('#discussion-header').hide();
        $('#new-topic-form').show().addClass('active');
    });

    $('.btn-bold').click(function(){
        $(this).toggleClass('text-effect');
    });

    $('.btn-italic').click(function(){
        $(this).toggleClass('text-effect');
    });

    $('#btn-send-new-topic').click(function(){

        let articleCard = $('<article></article>').addClass('card-discussion new-topic');

        let overlayCard = $('<span></span>').addClass('overlay-card');
        let overlayIcon = $('<i class="fa fa-check" aria-hidden="true"></i>');
        let overlayTitle = $('<p><b>Aguardando feedback dos autores</b></p>');
        let overlayEdit = $('<a>Editar tópico</a>');

        overlayCard.append(overlayIcon,overlayTitle,overlayEdit);

        let wrapperCard = $('<div></div>').addClass('wrapper-card') ;       

        let headerCard = $('<header></header>').addClass('card-discussion-header');
        let headerCardTitle = $('<h4></h4>').html($('#topicSubject').val());
        let headerCardAuthor = $('<p></p>').html('Autor do tópico');

        let contentCard = $('<p></p>').addClass('card-discussion-content').html($('#topicContent').val());

        let footerCard = $('<footer></footer>');
        let footerCardOptions = '<i class="fa fa-ellipsis-v fa-lg" aria-hidden="true"></i>';
        let footerLikeButton = $('<button></button>').addClass('button').html('<i class="fa fa-heart" aria-hidden="true"></i>');
        let likesCount = $('<p></p>').addClass('likes').html(`0 likes`);
        let answersCount = $('<p></p>').addClass('likes').html(`0 respostas`);

        $(headerCard).append(headerCardTitle,headerCardAuthor);         
        $(footerCard).append(footerCardOptions,footerLikeButton,likesCount,answersCount);

        $(wrapperCard).append(headerCard,contentCard,footerCard);

        $(articleCard).append(overlayCard,wrapperCard);
        
        $(articleCard).insertBefore('article#1'); 
        $('#topicSubject').val('');
        $('#topicContent').val(''); 
    });
        
});

