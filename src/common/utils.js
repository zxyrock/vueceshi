export function debounce(func, wait){
  let timer;
   return function() {
   // arguments中存着e
   let args = arguments; 
   
      
   if (timer) clearTimeout(timer);

   timer = setTimeout(() => {
     func.apply(this, args)
   }, wait)
 }
}