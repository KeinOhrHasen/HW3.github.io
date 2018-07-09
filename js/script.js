
//  download the JSON fole
window.onload = () =>{
  fetch("https://api.myjson.com/bins/152f9j")
  .then(response => {
    response.json().then(data => {

      // store data in localStorage
      console.log(data.data[1].createdAt);
      const myJSON = JSON.stringify(data);
      // console.log(myJSON);
      localStorage.setItem("testJSON", myJSON);
    });
  })
  .catch(err => {
    console.log(err);
  });



// get and write data from LoaclStorage to main
let text = localStorage.getItem("testJSON");
obj = JSON.parse(text);

let new_text = document.createTextNode(obj.data[1].title);

document.getElementById("main_id").appendChild(new_text);


}




 
// Sorting by date
let date_sort_asc = function (item1, item2) {
  if ( Date.parse(item1.createdAt)  >  Date.parse(item2.createdAt)) return 1;
  if ( Date.parse(item1.createdAt) <  Date.parse(item2.createdAt)) return -1;
  return 0;
};

let date_sort_desc = function (item1, item2) {
  if (Date.parse(item1.createdAt) > Date.parse(item2.createdAt)) return -1;
  if (Date.parse(item1.createdAt) < Date.parse(item2.createdAt)) return 1;
  return 0;
};



// Sorting by tags
let tags_sort = function (item1, item2) {

  if (item1.tags_match1 > item2.tags_match2)
    return -1;
  if (item1.tags_match1 > item2.tags_match2)
    return 1;

  if ( Date.parse(item1.createdAt)  >  Date.parse(item2.createdAt))
    return - 1;
  if ( Date.parse(item1.createdAt) <  Date.parse(item2.createdAt))
    return 1;

return 0;
}


let choosed_tags = [];


// TAGS query

setTimeout(function(){
  obj.data.sort(date_sort_asc);
  console.log(obj);





// make tagArray
  let tagArray = [];
  for(let i = 0; i < 50; i++){
    console.log(obj.data[i].tags);
    for(let j = 0; j < obj.data[i].tags.length; j++){
      if (!tagArray.includes(obj.data[i].tags[j]) ){
        tagArray.push(obj.data[i].tags[j]);
      }
    };
  };
  console.log(tagArray);
  

  // create list of elements in page
  let tagListNode = document.createElement("ul");
  tagListNode.classList.add('tag_wrp');

  for(let k = 0; k < tagArray.length; k++){
    let new_li = document.createElement("li");
    new_li.innerHTML = tagArray[k];
    new_li.setAttribute('id', "tag" + (k+1 ));
    new_li.classList.add('tag');

    new_li.addEventListener('click', function(e){
      if (!new_li.classList.contains("choosed")){
        new_li.classList.add("choosed");
        new_li.classList.remove("unchoosed");
      }else{
        new_li.classList.remove("choosed");
        new_li.classList.add("unchoosed");
      }
      // console.log(e.target.id)



      // add to list of choosed tags;
      let curr_tag = tagArray[+e.target.id.substr(-1)-1]
      console.log( curr_tag);

      if (!choosed_tags.includes(curr_tag)){
        choosed_tags.push(curr_tag);
      }else{
      choosed_tags.splice((choosed_tags.findIndex(curr_tag)) , 1);
      }
      console.log(choosed_tags);

      
    }, false)


    tagListNode.appendChild(new_li);
    }
  document.getElementById("main_id").appendChild(tagListNode);
  






}, 1500
)
