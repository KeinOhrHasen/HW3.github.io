
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
build(obj.data.sort(date_sort_desc));
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

  if (item1.tagOccurs > item2.tagOccurs)
    return -1;
  if (item1.tagOccurs < item2.tagOccurs)
    return 1;
  if ( Date.parse(item1.createdAt)  >  Date.parse(item2.createdAt))
    return - 1;
  if ( Date.parse(item1.createdAt) <  Date.parse(item2.createdAt))
    return 1;
return 0;
}


function build(array ){
  delete_post();
  let article_box = document.getElementById("article_box");
  article_box.innerHTML = "";
  let one_art = document.createElement('div');
  
  for(let i = 0; i < array.length; i++){
    let title = document.createElement('div');
    let descr = document.createElement('div');
    let image = document.createElement('img');
    let time =  document.createElement('div');
    let rubbish = document.createElement('div');
    one_art.setAttribute('class', 'one_art');
    title.setAttribute('class', 'title');
    descr.setAttribute('class', 'descr');
    image.setAttribute('src', 'image');
    time.setAttribute('class', 'time');
    rubbish.setAttribute("id", 'rb' + i);
    rubbish.setAttribute("class", 'rb');

    let t = document.createTextNode(array[i].title);
    let tt = document.createTextNode(array[i].description);
    image.setAttribute('src', array[i].image);
    let ttt = document.createTextNode(beautifyTime(array[i].createdAt));
    title.appendChild(t);
    descr.appendChild(tt);
    time.appendChild(ttt);

    let tags_wrp_article = document.createElement('div');
    tags_wrp_article.setAttribute('class', 'tags_wrp_article');

    for(let j = 0; j < array[i].tags.length; j++){
      let tag_article = document.createElement('div');
      tag_article.setAttribute('class', 'tag_article');
      let tag = document.createTextNode(array[i].tags[j]);
      tag_article.appendChild(tag);
      tags_wrp_article.appendChild(tag_article)

    };
    one_art.appendChild(title);
    one_art.appendChild(image);
    one_art.appendChild(descr);
    one_art.appendChild(time);
    one_art.appendChild(tags_wrp_article);
    one_art.appendChild(rubbish);
    article_box.appendChild(one_art);
  }
  

}

function a_d_tougle(){
  let date_button = document.getElementById("date_s");
  if (!date_button.classList.contains("asc_ord")){
    date_button.classList.add("asc_ord");
    date_button.classList.remove("desc_ord");
    build(obj.data.sort(date_sort_asc));
  }else{
    date_button.classList.remove("asc_ord");
    date_button.classList.add("desc_ord");
    build(obj.data.sort(date_sort_desc));

  }
}


// to compare object
function compare(object, tags){
  for (let q = 0; q < 50; q++){
    let occurs = 0;
    for(let w = 0; w < object.data[q].tags.length; w++){
      if (tags.includes(object.data[q].tags[w]) ){
        // console.log(object.data[q].tags[w]);
        occurs += 1;
      }
    };
    object.data[q].tagOccurs = occurs;
    occurs = 0;
  }
  return object
}

// console.log(compare(obj, choosedTags));
// TAGS query
let choosedTags = [];

setTimeout(function(){

// make tagArray
  let tagArray = [];
  for(let i = 0; i < 50; i++){
    // console.log(obj.data[i].tags);
    for(let j = 0; j < obj.data[i].tags.length; j++){
      if (!tagArray.includes(obj.data[i].tags[j]) ){
        tagArray.push(obj.data[i].tags[j]);
      }
    };
  };
  

  // create list of elements in page
  let tagListNode = document.createElement("ul");
  tagListNode.classList.add('tag_wrp');

  for(let k = 0; k < tagArray.length; k++){
    let new_li = document.createElement("li");
    new_li.innerHTML = tagArray[k];
    new_li.setAttribute('id', "tag" + (k+1 ));
    new_li.classList.add('tag');


    // add event listener - change colour
    new_li.addEventListener('click', function(e){
      if (!new_li.classList.contains("choosed")){
        new_li.classList.add("choosed");
        new_li.classList.remove("unchoosed");
      }else{
        new_li.classList.remove("choosed");
        new_li.classList.add("unchoosed");
      }



      // add to list of choosed tags or remove;
      let curr_tag = tagArray[+e.target.id.substr(-1)-1];

      if (!choosedTags.includes(curr_tag)){
        choosedTags.push(curr_tag);
      }else{
        choosedTags.splice(choosedTags.indexOf(curr_tag), 1);
      }
      
      let bro = compare(obj, choosedTags);
      build(bro.data.sort(tags_sort));

    }, false)


    tagListNode.appendChild(new_li);
    }
  document.getElementById("taglist_wrp").appendChild(tagListNode);
  


// put action on Date button
let date_button = document.getElementById("date_s");
date_button.addEventListener("click", a_d_tougle, false );

}, 100
)

function beautifyTime(timeString){
  let outPut = ''
  let date = new Date(timeString);
              
  let mm = date.getMonth(); 
  let dd = date.getDate();
  let hh = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
              
  let mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; 
              
  outPut += `${[  (hh>9 ? '' : '0') + hh + 'h', 
  (min>9 ? '' : '0') + min + 'm', 
  (sec>9 ? '' : '0') + sec + 's',
  (dd>9 ? '' : '0') + dd,
  mS[+((mm>9 ? '' : '0') + mm)],
  date.getFullYear()
  ].join(', ')}`
  return outPut
}


function delete_post(){
  rubbish_q = document.getElementsByClassName('rb');
  for(let i = 0; i < rubbish_q.length; i++){
    
    let item = rubbish_q[i];
    item.addEventListener('click', function(e){
     
      document.getElementById(e.target.id).parentElement.style.display = 'none';
    })
  }
}

// delete_post(); 
