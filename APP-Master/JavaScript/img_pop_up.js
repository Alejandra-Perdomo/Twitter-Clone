
const modal=document.querySelector('.modal');
const previews=document.querySelectorAll('.tweet-img');
const full_img=document.querySelector('.full-img');
let selectedImgURL='';



/* previews.forEach((preview) => {  
    preview.addEventListener('click',()=>{
        selectedImgURL=preview.style.backgroundImage.slice(4, -1).replace('"','').replace('"','');
        modal.classList.add('open'); 
        full_img.src=selectedImgURL;
        full_img.classList.add('open');  
    })
}); */

PopUp=(tag)=>{
    selectedImgURL=tag.style.backgroundImage.slice(4, -1).replace('"','').replace('"','');
    modal.classList.add('open'); 
    full_img.src=selectedImgURL;
    full_img.classList.add('open');
  
}

modalEvent=(tag)=>{
 
 if(tag.classList.contains('open')){
     modal.classList.remove('open');
     full_img.classList.remove('open');
     full_img.removeAttribute('src');
 }
}

