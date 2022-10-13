/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
// Test / driver code (temporary). Eventually will get this from the server.
const tweetDb = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const renderTweets = function (tweetDb) {
  $('#tweets-container').empty();
  for (const tweet of tweetDb) {
    console.log("Here is my tweet", tweet);
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
}
const createTweetElement = function (tweet) {
  // data from db
  const tweetContent = tweet.content.text;
  const user = tweet.user.name;
  const avatar = tweet.user.avatars;
  const handle = tweet.user.handle;
  const days = tweet.created_at;

  const $allTweets = $("<article>").addClass("all-tweets-article")

  const $tweetHeader = $(`
  <header class="tweetHeader">
  <img src= ${escape(avatar)}>
  <span class ="username">${escape(user)}</span>
  <span class="tweet-username">${escape(handle)}</span>
  </header>
`);
  const $tweetContent = $(`
<div class= "tweetContent">
<p>${escape(tweetContent)}</p>
</div>
`);
  const $tweetFooter = $(`
<footer class="tweetFooter">
${moment(days).fromNow()}
  <span><i class="fa-solid fa-flag"></i><i class="fa-solid fa-repeat"></i><i class="fa-solid fa-heart"></i></span>
</footer>
`);

  $allTweets.append($tweetHeader, $tweetContent, $tweetFooter)
  return $allTweets;
}
//renderTweets(tweetDb);
//renderTweets(tweetDb)

const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
  })
    .then((tweetDb) => {
      console.log("your page is grabbing the tweets from database");
      renderTweets(tweetDb);
    })
    .catch((err) => {
      console.log("There was an ERROR ", err);
    });
};
const $form = $("#new-tweet-form")

$form.submit(function (event) {
    event.preventDefault(); 
    const $tweetText = $('#tweet-text')
    const dataToSendToServer = $form.serialize();
    console.log(dataToSendToServer);

    $('.errorText').slideUp(400).text('');

    if (!$tweetText.val()) {
      return $('.errorText').text("Tweet can't be empty!").slideDown();
    }
    if ($tweetText.val().length > 140) {
      return $('.errorText').text('Too long tweet!').slideDown();
    }
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: dataToSendToServer
    })
    .then(function (tweetDb) {
    $tweetText.val('').focus();
    loadTweets();
    
    
    })
    
    .catch((error) => {
      console.log('error', error);
    });
  });

})

