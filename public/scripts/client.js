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

  // Preventing Cross-Site Scripting attack with Escape function
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function to take in an array of tweet objects and then appending each one to the #tweets-container
  const renderTweets = function (tweetDb) {
    $('#tweets-container').empty();
    for (const tweet of tweetDb) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }

  //Function to generate the DOM structure for a tweet, given a tweet object
  const createTweetElement = function (tweet) {
    // data from tweetDb
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

  //Function uses AJAX to make a request to /tweets and receive the array of tweets as JSON.
  const loadTweets = function () {
    $.ajax({
      method: 'GET',
      url: '/tweets',
    })
      .then((tweetDb) => {
        renderTweets(tweetDb);
      })
      .catch((err) => {
        console.log("There was an ERROR ", err);
      });
  };

  //Submit the form data and display the new tweet without causing the page to refresh.
  const $form = $("#new-tweet-form")

  $form.submit(function (event) {
    event.preventDefault(); //to prevent the default form submission
    const $tweetText = $('#tweet-text')
    const dataToSendToServer = $form.serialize(); //Serialize the form data and send it to the server as a query string.

    $('.errorText').slideUp(400).text('');
    //Error message if the data is empty ("")
    if (!$tweetText.val()) {
      return $('.errorText').text("Tweet can't be empty!").css("color", "red").slideDown();
    }
    //Error message if the data length is over the specified limit
    if ($tweetText.val().length > 140) {
      return $('.errorText').text('Too long tweet!').css("color", "red").slideDown();
    }
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: dataToSendToServer
    })
      .then(function (tweetDb) {
        $tweetText.val('').focus();
        $('.counter').val('140')
        loadTweets();
      })
      .catch((error) => {
        console.log('error', error);
      });
  });
})

