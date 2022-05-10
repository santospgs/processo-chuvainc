$(document).ready(function(){       
    $('.moreless-button').click(function(){
        $('.moretext').slideToggle();
        $(this).text() == '...ver mais' ? $(this).text('...ver menos') : $(this).text('...ver mais')
        
    })

    $('.item-menu').click(function(){
        $('.item-menu').removeClass('active')
        $(this).addClass('active')
    })

    fetch('./js/forum_data.json')
    .then(function(response){
        return response.json()
    })
    .then(function(response){
        showCards(response)
    })

    function showCards(data){
        let sectionDiscussion = document.querySelector('#discussion .section-content')

        data.forEach(function(card){
            /* CRIANDO O CARD */
            let articleCard = document.createElement('article');
            articleCard.setAttribute('id', card.id)
            articleCard.classList.add('card-discussion')

            /*CRIANDO O HEADER */
            let headerCard = document.createElement('header')
            headerCard.classList.add('card-discussion-header')

            let headerCardTitle = document.createElement('h4')
            headerCardTitle.innerText = card.title
            let headerCardAuthor = document.createElement('p')
            headerCardAuthor.innerText = card.author

            /*CRIANDO O CONTEUDO */
            let contentCard = document.createElement('p')
            contentCard.classList.add('card-discussion-content')
            contentCard.innerText = card.content

            /* CRIANDO O FOOTER */
            let footerCard = document.createElement('footer')
            let footerCardOptions = '<i class="fa fa-ellipsis-v fa-lg" aria-hidden="true"></i>'
            let footerLikeButton = document.createElement('button')
            footerLikeButton.classList.add('button')
            footerLikeButton.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>'
            let likesCount = document.createElement('p')
            likesCount.classList.add('likes')
            likesCount.innerText = card.likes + ' likes'
            let answersCount = document.createElement('p')
            answersCount.classList.add('likes')
            answersCount.innerText = card.answers.length + ' respostas'
            
            headerCard.appendChild(headerCardTitle)
            headerCard.appendChild(headerCardAuthor)
            
            footerCard.innerHTML = footerCardOptions
            footerCard.appendChild(footerLikeButton)
            footerCard.appendChild(likesCount)
            footerCard.appendChild(answersCount)

            articleCard.appendChild(headerCard)
            articleCard.appendChild(contentCard)
            articleCard.appendChild(footerCard)

            sectionDiscussion.appendChild(articleCard)
        })
    }

    $('#addNewTopicButton').click(function(){
        $('#discussion-header').hide()
        $('#new-topic-form').show().addClass('active')
    })
});

