/* Elementos principais */
const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
const views = Array.from(document.querySelectorAll('.app-view'));
const colunaEsquerda = document.getElementById('coluna-esquerda');
const bodyEl = document.body;


const MOBILE_MAX = 991;


function ativarView(viewName) {
  
  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
    btn.setAttribute('aria-selected', btn.dataset.view === viewName ? 'true' : 'false');
  });

  views.forEach(v => {
    v.classList.toggle('active-view', v.id === 'view-' + viewName);
  });


  if (viewName === 'feed' && window.innerWidth > MOBILE_MAX) {
    bodyEl.classList.add('show-left-col');
    bodyEl.classList.remove('hide-left-col');
  } else {
    bodyEl.classList.add('hide-left-col');
    bodyEl.classList.remove('show-left-col');
  }
}


navButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const targetView = btn.dataset.view;
    ativarView(targetView);
    document.getElementById('conteudo-central').scrollTop = 0;
  });
});


window.addEventListener('resize', () => {

  const activeBtn = navButtons.find(b => b.classList.contains('active'));
  const viewName = activeBtn ? activeBtn.dataset.view : 'feed';

  ativarView(viewName);
});


document.addEventListener('DOMContentLoaded', () => {
  ativarView('feed');
});
