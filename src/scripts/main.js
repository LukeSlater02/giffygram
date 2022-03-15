// Can you explain what is being imported here?
import { getPosts, getUsers, usePostCollection } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import {NavBar} from "./nav/NavBar.js"
import {footer} from "./nav/footer.js"

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

applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout"){
        console.log("You clicked on logout.");
    }
})

applicationElement.addEventListener("click", event => {
      if (event.target.id === "homeIcon"){
          console.log("You clicked on Home.");
      }
  })

applicationElement.addEventListener("click", event => {
    if (event.target.id === "directMessageIcon"){
        console.log("You clicked on Direct Message.");
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("edit")){
        console.log("post clicked", event.target.id.split("--"));
        console.log("the id is", event.target.id.split("--")[1])
    }
})

const startGiffyGram = () => {
	showPostList();
    showNavBar();
    showFooter();
}



startGiffyGram();

const showFilteredPosts = (year) => {
    //get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
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
