
    // Usa os eventos nativos do Bootstrap Collapse para atualizar o texto do botão
    const perfilCollapse = document.getElementById('perfilCompleto');
    const btnVerMais = document.getElementById('btnVerMais');
    
    perfilCollapse.addEventListener('shown.bs.collapse', () => {
        btnVerMais.innerText = "Recolher informações";
    });
    
    perfilCollapse.addEventListener('hidden.bs.collapse', () => {
        btnVerMais.innerText = "Ver perfil completo";
    });
