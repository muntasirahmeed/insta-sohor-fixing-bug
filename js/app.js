let posts=[ ];

const likedPostsId = [];
const reportedPostsId = [];

const getLikedPosts = () => {
    return posts.filter((post) => likedPostsId.includes(post.id));
};

const getReportedPosts = () => {
    return posts.filter((post) => reportedPostsId.includes(post.id));
};

const isLiked = (id) => {
    return likedPostsId?.length && !!likedPostsId.includes(id);
};

const addToLiked = (id) => {
    likedPostsId.push(id); 
    showPosts(posts);
};

const reportPost = (id) => {
    reportedPostsId.push(id);
    const remainingPosts = posts.filter((post) => !reportedPostsId.includes(post.id));
    showPosts(remainingPosts);
};

const displayContent = (text) => {
    return text.length < 30 ? text : text.slice(0, 30) + "<span class='fw-bold'>... read more</span>";
};

const switchTab = (id) => {
    if (id === "posts") {
        document.getElementById( "posts" ).style.display = "grid";
        document.getElementById( "liked" ).style.display = "none";
      document.getElementById("reported").style.display = "none";
      loadQuestionAnswer();
    } else if (id === "liked") {
        document.getElementById( "liked" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";

        displayLikedPosts();
    } else {
        document.getElementById( "reported" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "liked" ).style.display = "none";

        displayReportedPosts();
    }
};

const createPost = (post) => {
  
    const image = post.image;
    const div = document.createElement( "article" );
    div.classList.add( "post" );
    div.innerHTML = `
              <div class="post__header">
                <div class="post__profile">
                  <a
                    href="https://github.com/ProgrammingHero1"
                    target="_blank"
                    class="post__avatar"
                  >
                    <img src="${post.userImage}" alt="User Picture" />
                  </a>
                  <a href="#" class="post__user">phero</a>
                </div>

                <button class="post__more-options">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
              </div>

              <div class="post__content">
                <div class="post__medias">
                  <img
                    class="post__media"
                    src="${image}"
                    alt="Post Content"
                  />
                </div>
              </div>

              <div class="post__footer">
                <div class="post__buttons">
                  <button class="post__button" onclick="addToLiked(${post.id})">
                  <i class="fa-solid fa-heart ${isLiked(post.id) && "text-danger"}"></i>
                    
                  </button>
                  <button class="post__button">
                    <i class="fa-solid fa-comment"></i>
                  </button>
                  

                  <div class="post__indicators"></div>

                  <button class="post__button post__button--align-right" onclick="reportPost(${
                      post.id
                  })">
                    <i class="fa-solid fa-ban"></i>
                  </button>
                </div>

                <div class="post__content">${displayContent(post.description)}</div>

                <div class="post__infos">
                  <div class="post__likes">
                    <a href="#" class="post__likes-avatar">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="User Picture" />
                    </a>

                    <span>Liked by
                      <a class="post__name--underline" href="#">user123</a> and
                      <a href="#">73 others</a></span>
                  </div>

                  <hr/>

                  <div class="post__description">
                    <small>
                      <a class="post__name--underline" href="#">
                          ${post.comments[0]?.user}
                      </a>
                      ${post.comments[0]?.text}
                    </small>
                  </div>
                  <span class="post__date-time">30 minutes ago</span>
                </div>
              </div>
      `;
    return div;
};

const showPosts = (posts) => {
  
    const productsContainer = document.getElementById( "posts" );
    productsContainer.innerHTML = "";

    posts.forEach((post) => {
        const div = createPost(post);
        productsContainer.appendChild(div);
    });
};

const displayLikedPosts = () => {
  document.getElementById("ans-question").innerHTML = "";
  document.getElementById("liked").innerHTML = '';
  document.getElementById("liked").innerHTML = `<h1 class="mb-4">Liked posts</h1>`
  const likedPosts = getLikedPosts();
    likedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "liked" ).appendChild(div);
    });
};

const displayReportedPosts = () => {
  document.getElementById("ans-question").innerHTML="";
   document.getElementById("reported").innerHTML = "";
   document.getElementById("reported").innerHTML = `<h1 class="mb-4">Reported posts</h1>`;
    const reportedPosts = getReportedPosts();
    reportedPosts.forEach((post) => {
      const div = createPost(post);
      document.getElementById("reported").appendChild(div);
    });
};

const loadPosts = async () =>{
  let data = await fetch('../data/posts.json');
  posts = await data.json();
  showPosts(posts);
}
const loadQuestionAnswer=() => {
  const container = document.getElementById("ans-question");
  container.innerHTML = `
  <div>
        <h1 class="text-center my-5 ">Answering Two Question</h1>
        <div class="row">
          <div class="col-md-6 col-12">
            <div class="">
              <h2 class="text-center mb-4 p-3">
                জাভাস্ক্রিপ্ট কিভাবে কাজ করে ?
              </h2>
              <p>
                জাভাস্ক্রিপ্ট একটি ক্লায়েন্ট-সাইড স্ক্রিপ্টিং Language , এবং
                সবচেয়ে দক্ষ, সাধারণত ব্যবহৃত স্ক্রিপ্টিং ভাষাগুলির মধ্যে একটি।
                ক্লায়েন্ট-সাইড স্ক্রিপ্টিং ল্যাঙ্গুয়েজ শব্দটির অর্থ হল এটি
                ওয়েব-ব্রাউজারের ভিতরে ক্লায়েন্ট-সাইডে (বা ক্লায়েন্ট মেশিনে)
                চলে । এই জাভাস্ক্রিপ্টকে ব্রাউজার এ চালাইতে গেলে ব্রাউজার কে
                জাভাস্ক্রিপ্ট বুঝতে হয় আর এই জাভাস্ক্রিপ্ট বুঝার জন্য বিভিন্ন
                ব্রাউজার বিভিন্ন ধরনের জাভাস্ক্রিপ্ট ইঞ্জিন ব্যবহার করে ।
                উদাহরণস্বরূপ, Google Chrome এর নিজস্ব জাভাস্ক্রিপ্ট ইঞ্জিন
                রয়েছে যার নাম V8। এই ইঞ্জিন Chrome এর মধ্যে জাভাস্ক্রিপ্ট রান
                করে
              </p>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div>
              <h2 class="text-center mb-4 p-3">
                জাভাস্ক্রিপ্ট ইভেন্ট লুপ কি করে?
              </h2>
              <p>
                javascript overall যখন v8 ইঞ্জিন দিয়ে execute হয় তখন javascript
                browser এর মধ্যেই থাকে । v8 ইঞ্জিন কোড গুলোকে execute করে কিন্তু
                ওটাকে manage করে Event Loop । কোনটার পরে কোনটা synchronously এবং
                asynchronously কাজ করবে সেটা কিন্তু browser এর মধ্যে ইভেন্ট লুপই
                করে ।যেই কোডটা synchronously execute হইতেছে সেটাকে stack বলা হয়
                আর যেই কোডটা asynchronously execute হইতেছে সেটাকে Queue বলা হয় ।
                Event Loop প্রথমে stack কে execute করে তারপর সব stack execute
                করা শেষ হয়ে গেলে Queue কে execute করে ।
              </p>
            </div>
          </div>
        </div>
      </div>
  `;
}
loadQuestionAnswer();
loadPosts();