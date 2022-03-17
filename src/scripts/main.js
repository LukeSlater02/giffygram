// Can you explain what is being imported here?
import { getPosts, createPost, usePostCollection, getLoggedInUser} from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import {NavBar} from "./nav/NavBar.js"
import {footer} from "./nav/footer.js"
import { postEntry } from "./feed/postEntry.js"

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const showNavBar = () => {
    document.querySelector("nav").innerHTML = NavBar()
}

const showFooter = () => {
    document.querySelector("footer").innerHTML = footer()
}

const applicationElement = document.querySelector(".giffygram")

// applicationElement.addEventListener("click", event => {
//     if (event.target.id === "logout"){
//         console.log("You clicked on logout.");
//     }
// })

// applicationElement.addEventListener("click", event => {
//       if (event.target.id === "homeIcon"){
//           console.log("You clicked on Home.");
//       }
//   })

// applicationElement.addEventListener("click", event => {
//     if (event.target.id === "directMessageIcon"){
//         console.log("You clicked on Direct Message.");
//     }
// })

// applicationElement.addEventListener("click", event => {
//     if (event.target.id.startsWith("edit")){
//         console.log("post clicked", event.target.id.split("--"));
//         console.log("the id is", event.target.id.split("--")[1])
//     }
// })

applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout"){
        console.log("You clicked on logout.");
    } 
    else if (event.target.id === "homeIcon"){
        console.log("You clicked on Home.");
    } 
    else if (event.target.id === "directMessageIcon"){
        console.log("You clicked on Direct Message.");
    } 
    else if (event.target.id.startsWith("edit")){
        console.log("post clicked", event.target.id.split("--"));
        console.log("the id is", event.target.id.split("--")[1])
    }
})

const showPostEntry = () => { 
  //Get a reference to the location on the DOM where the nav will display
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = postEntry();
}

const startGiffyGram = () => {
	showPostList();
    showNavBar();
    showFooter();
    showPostEntry()
}

startGiffyGram();

const showFilteredPosts = (year) => {
    //get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
    console.log(epoch.customFormat("#YYYY#"));
    //filter the data
    const filteredData = usePostCollection().filter(singlePost => {
      if (singlePost.timestamp >= epoch) {
        let postDate = new Date(singlePost.timestamp)
        console.log(postDate.toLocaleDateString());
        return singlePost
      }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
  }

applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
      const yearAsNumber = parseInt(event.target.value)
      console.log(`User wants to see posts since ${yearAsNumber}`)
      //invoke a filter function passing the year as an argument
      showFilteredPosts(yearAsNumber);
    }
  })

  applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        //clear the input fields
    }
  })
  
  applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "newPost__submit") {
    //collect the input values into an object to post to the DB
      const title = document.querySelector("input[name='postTitle']").value
      const url = document.querySelector("input[name='postURL']").value
      const description = document.querySelector("textarea[name='postDescription']").value
      //we have not created a user yet - for now, we will hard code `1`.
      //we can add the current time as well
      const postObject = {
        title: title,
        imageURL: url,
        description: description,
        userId: getLoggedInUser().id,
        timestamp: Date.now()
      }
    
    // be sure to import from the DataManager
      createPost(postObject)
    }
    showPostList()
    showPostEntry()
  })
