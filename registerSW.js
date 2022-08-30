if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>{
      navigator.serviceWorker
        .register('../sw.js', { scope: '/' })
        .then((reg) => console.log('sW registered'))
        .catch((err) => console.log('error'));
  })

}
