document.addEventListener('DOMContentLoaded', function () {

 
  const navLinks = document.querySelectorAll('.nav-main-link'); // itens SPA
  const views = document.querySelectorAll('.app-view');         // telas SPA



  function showView(targetName, pushState = false) {
    const target = document.querySelector(`#view-${targetName}`);
    if (!target) return;


    navLinks.forEach(n =>
      n.classList.toggle('active', n.dataset.target === targetName)
    );

    const current = document.querySelector('.app-view.active-view');
    if (current === target) return;

    if (current) {
      current.classList.remove('active-view');
      current.classList.add('view-exit-active');
      setTimeout(() => {
        current.classList.remove('view-exit-active');
        current.style.display = 'none';
      }, 250);
    }

  
    target.style.display = 'block';
    requestAnimationFrame(() => {
      target.classList.add('view-enter-active');
      target.classList.add('active-view');
      setTimeout(() => {
        target.classList.remove('view-enter-active');
      }, 320);
    });

    // atualiza URL
    if (pushState) {
      history.pushState({ view: targetName }, '', `#${targetName}`);
    }
  }


    if (!v.classList.contains('active-view')) {
      v.style.display = 'none';
    }
  });


 
  document.querySelectorAll('[data-target]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.dataset.target;
      showView(target, true);
    });
  });


  navLinks.forEach(n => {
    n.addEventListener('click', e => {
      e.preventDefault();
      const target = n.dataset.target;
      if (target) showView(target, true);
    });
  });

  // voltar no navegador
  window.addEventListener('popstate', ev => {
    const view = (ev.state && ev.state.view) || 'feed';
    showView(view, false);
  });

  // Marca FEED ativo ao iniciar
  navLinks.forEach(n => {
    n.classList.toggle('active', n.dataset.target === 'feed');
  });


  /*cars  */
  document.querySelectorAll('.card-clickable, [data-open]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const key = el.dataset.open;
      if (key) openProjectPreview(key);
    });
  });

  function openProjectPreview(key) {
    const contentMap = {
      mochila: {
        title: 'Mochila Solar Inteligente',
        text: 'Garantir autonomia energética completa para estudantes, profissionais e aventureiros.'
      },
      rebanho: {
        title: 'Digitalização e Gestão Inteligente do Rebanho',
        text: 'Centralizar todos os dados do rebanho bovino, otimizando a gestão.'
      },
      carregador: {
        title: 'Carregador Solar',
        text: 'Carregador 100% solar para ambientes externos.'
      }
    };

    const data = contentMap[key] || { title: 'Projeto', text: 'Detalhes do projeto...' };

    const overlay = document.createElement('div');
    overlay.className = 'project-overlay';
    overlay.innerHTML = `
      <div class="project-card">
        <button class="close-btn">&times;</button>
        <h3>${data.title}</h3>
        <p class="text-muted">${data.text}</p>

        <div class="mt-3">
          <a href="#" class="btn btn-primary">Ver detalhes</a>
          <button class="btn btn-outline-secondary ms-2 close-btn">Fechar</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelectorAll('.close-btn').forEach(btn =>
      btn.addEventListener('click', () => overlay.remove())
    );

    overlay.addEventListener('click', ev => {
      if (ev.target === overlay) overlay.remove();
    });
  }


  /* chat */
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');

  const seed = [
    { who: 'them', text: 'Olá! Precisando de ajuda com o protótipo?', time: '09:12' },
    { who: 'me', text: 'Sim — quero marcar testes semana que vem.', time: '09:13' },
    { who: 'them', text: 'Perfeito! Que tal terça às 14h?', time: '09:14' }
  ];

  function escapeHtml(s) {
    return s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderMessages(list) {
    chatMessages.innerHTML = '';
    list.forEach(msg => {
      const div = document.createElement('div');
      div.className = 'msg ' + (msg.who === 'me' ? 'me' : 'them');
      div.innerHTML = `
        <div>${escapeHtml(msg.text)}</div>
        <span class="msg-time">${msg.time}</span>
      `;
      chatMessages.appendChild(div);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  renderMessages(seed);

  function sendMessage(text) {
    if (!text.trim()) return;

    const now = new Date();
    seed.push({
      who: 'me',
      text,
      time: `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
    });

    renderMessages(seed);

    // resposta automática
    setTimeout(() => {
      const replies = [
        'Perfeito, vou confirmar!',
        'Recebido.',
        'Vamos ajustar o cronograma depois.'
      ];

      const reply = replies[Math.floor(Math.random() * replies.length)];
      const t = new Date();

      seed.push({
        who: 'them',
        text: reply,
        time: `${String(t.getHours()).padStart(2,'0')}:${String(t.getMinutes()).padStart(2,'0')}`
      });

      renderMessages(seed);
    }, 900 + Math.random() * 700);
  }

  chatSendBtn.addEventListener('click', () => {
    sendMessage(chatInput.value);
    chatInput.value = '';
  });

  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      chatSendBtn.click();
    }
  });


  /* css*/
  const overlayCSS = `
    .project-overlay{
      position:fixed; inset:0;
      background:rgba(0,0,0,0.35);
      display:flex; align-items:center; justify-content:center;
      z-index:9999;
    }
    .project-card{
      background:#fff; padding:24px;
      border-radius:12px; width:100%; max-width:700px;
      box-shadow:0 20px 45px rgba(0,0,0,0.25);
      animation: zoomIn .25s ease;
    }
    @keyframes zoomIn{
      from{ transform:scale(.85); opacity:0; }
      to{ transform:scale(1); opacity:1; }
    }
  `;
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(overlayCSS));
  document.head.appendChild(style);

});
