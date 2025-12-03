import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

// =============================
// COMPONENTE PRINCIPAL (App)
// =============================
const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const handleLinkClick = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = document.querySelector('.header').offsetHeight || 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} onLinkClick={handleLinkClick} activeSection={activeSection} />
      <main>
        <Hero />
        <ProjectInfo />
        <HowToUse />
        <DetailedConfig />
        <TechnicalSpecs />
        <AboutUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

// =============================
// CABEÇALHO (Header)
// =============================
const Header = ({ menuOpen, toggleMenu, onLinkClick, activeSection }) => {
  const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#projeto', label: 'O Projeto' },
    { href: '#comousar', label: 'Como Usar' },
    { href: '#configuracao-detalhada', label: 'Configuração' },
    { href: '#especificacoes', label: 'Especificações' },
    { href: '#sobrenos', label: 'Sobre Nós' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <header className="header">
      <div className="container navbar">
        <a href="#inicio" onClick={onLinkClick} className="logo">Digital Integration</a>
        <nav>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            {navLinks.map(link => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  onClick={onLinkClick} 
                  className={activeSection === link.href.substring(1) ? 'active' : ''}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-icon" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </div>
      </div>
    </header>
  );
};

// =============================
// SEÇÃO INICIAL (Hero)
// =============================
const Hero = () => (
  <section id="inicio">
    <div className="container hero-content">
      <h1>Conectividade Híbrida. Máxima Confiabilidade.</h1>
      <p>Modernize suas balanças com nossa solução de conectividade dupla. <strong>Wi-Fi e Ethernet trabalhando juntos</strong> para garantir que seus dados nunca parem de fluir, mesmo se uma conexão falhar.</p>
      <a href="#projeto" className="btn">Conheça a Tecnologia</a>
    </div>
  </section>
);

// =============================
// SEÇÃO DO PROJETO (ProjectInfo)
// =============================
const ProjectInfo = () => (
  <section id="projeto">
    <div className="container">
      <h2>O Desafio: Conexão sem Interrupções</h2>
      <p>Em ambientes industriais e comerciais, a perda de conexão significa perda de dados e paradas na produção. Nosso dispositivo resolve isso oferecendo uma solução de conectividade robusta que elimina o ponto único de falha das balanças seriais legadas.</p>
      <div className="project-grid">
        <FeatureCard 
          icon="🌐+🔌" 
          title="Conexão Híbrida Redundante" 
          description="Usa Wi-Fi e Cabo de Rede (RJ45) simultaneamente. Se uma conexão cair, a outra assume instantaneamente, garantindo alta disponibilidade." 
        />
        <FeatureCard 
          icon="⚡" 
          title="Failover Automático" 
          description="O sistema detecta falhas e alterna entre Wi-Fi e Ethernet sem intervenção manual, mantendo o fluxo de dados contínuo." 
        />
        <FeatureCard 
          icon="💻" 
          title="Integração Direta com ERP" 
          description="Transmita dados de pesagem diretamente para seu sistema de gestão, automatizando processos e eliminando erros de digitação." 
        />
         <FeatureCard 
          icon="🎛️" 
          title="Nova Interface Web" 
          description="Painel de controle moderno e intuitivo, acessível pelo navegador, para monitorar o status das duas conexões e configurar o dispositivo." 
        />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// =============================
// SEÇÃO COMO USAR (HowToUse)
// =============================
const HowToUse = () => (
  <section id="comousar">
    <div className="container">
      <h2>Instalação Híbrida Simplificada</h2>
      <div className="how-to-use-timeline">
        <div className="timeline-item">
          <div className="timeline-content">
            <span className="step">Passo 1</span>
            <h3>Conecte o Hardware</h3>
            <p>Conecte o dispositivo à porta serial da sua balança e ligue-o à energia. Para máxima confiabilidade, conecte também um cabo de rede (RJ45) à sua infraestrutura.</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
             <span className="step">Passo 2</span>
            <h3>Configure a Rede</h3>
            <p>Acesse a nova interface web pelo seu navegador. Configure sua rede Wi-Fi como conexão primária ou secundária. O cabo de rede é detectado automaticamente.</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
             <span className="step">Passo 3</span>
            <h3>Operação Contínua</h3>
            <p>O dispositivo gerencia as conexões. Ele usará a melhor conexão disponível e alternará automaticamente em caso de falha, garantindo que os dados da balança sempre cheguem ao seu sistema.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// =============================
// CONFIGURAÇÃO DETALHADA (DetailedConfig)
// =============================
const DetailedConfig = () => (
  <section id="configuracao-detalhada">
    <div className="container">
      <h2>Guia de Configuração Híbrida</h2>
      <p>Siga este guia para aproveitar ao máximo a redundância de rede do seu dispositivo ScaleConnect.</p>
      <div className="config-grid">
        <div className="config-step">
          <h3>1. Conexão Física (A Base da Redundância)</h3>
          <p>Para ativar a funcionalidade híbrida, a conexão física é crucial.</p>
          <ul>
            <li><strong>Porta Serial:</strong> Conecte à sua balança.</li>
            <li><strong>Porta Ethernet (RJ45):</strong> Conecte um cabo de rede do dispositivo ao seu switch ou roteador. Esta conexão é geralmente prioritária por sua estabilidade.</li>
            <li><strong>Alimentação:</strong> Ligue o dispositivo à energia.</li>
          </ul>
        </div>

        <div className="config-step">
          <h3>2. Acessando a Nova Interface Web</h3>
          <p>Inicialmente, o dispositivo cria um ponto de acesso Wi-Fi para configuração.</p>
          <ul>
            <li>Conecte-se à rede Wi-Fi: <strong>ScaleConnect-Config</strong>.</li>
            <li>Abra o navegador e acesse: <code>192.168.4.1</code></li>
            <li>A nova interface gráfica será carregada, mostrando o status das conexões (Wi-Fi e Cabo).</li>
          </ul>
        </div>

        <div className="config-step">
          <h3>3. Configurando o Wi-Fi (Backup ou Principal)</h3>
          <p>Na interface web, vá para a seção de configurações de rede.</p>
          <ul>
            <li>Selecione sua rede Wi-Fi principal na lista.</li>
            <li>Insira a senha e salve.</li>
            <li>O dispositivo tentará se conectar. Mesmo com o cabo conectado, o Wi-Fi fica configurado e pronto para assumir como backup.</li>
          </ul>
        </div>
        
        <div className="config-step">
          <h3>4. Monitoramento e Failover</h3>
          <p>Uma vez configurado, o dispositivo opera autonomamente.</p>
          <ul>
            <li><strong>Status na Interface:</strong> O painel web mostra em tempo real qual conexão está ativa (Cabo ou Wi-Fi) e o status da outra.</li>
            <li><strong>Teste de Failover:</strong> Para testar, você pode desconectar o cabo de rede. O sistema detectará a falha e mudará para o Wi-Fi automaticamente, sem perda de dados significativa. Ao reconectar o cabo, ele retorna à conexão prioritária.</li>
          </ul>
        </div>

        <div className="config-step">
            <h3>5. Integração de Dados</h3>
            <p>Configure seu sistema para receber os dados do dispositivo.</p>
            <ul>
                <li>O dispositivo terá um endereço IP na sua rede (atribuído via DHCP ou fixo, conforme sua configuração).</li>
                <li>Configure seu software ERP para "escutar" os dados de pesagem vindos deste IP, seja via conexão <strong>Socket TCP</strong> direta ou recebendo <strong>HTTP POSTs</strong> do dispositivo.</li>
            </ul>
        </div>
      </div>
    </div>
  </section>
);

// =============================
// ESPECIFICAÇÕES TÉCNICAS (TechnicalSpecs)
// =============================
const TechnicalSpecs = () => (
  <section id="especificacoes">
    <div className="container">
      <h2>Especificações Técnicas Híbridas</h2>
      <div className="specs-grid">
        <div className="spec-item">
          <strong>Conectividade Dupla</strong>
          <span>Wi-Fi 802.11 b/g/n + Ethernet (RJ45) 10/100 Mbps</span>
        </div>
        <div className="spec-item">
          <strong>Redundância</strong>
          <span>Failover automático entre Wi-Fi e Cabo</span>
        </div>
        <div className="spec-item">
          <strong>Interface Física de Dados</strong>
          <span>Serial RS232 (DB9)</span>
        </div>
        <div className="spec-item">
          <strong>Interface de Configuração</strong>
          <span>Painel Web Moderno e Responsivo (acessível via navegador)</span>
        </div>
        <div className="spec-item">
          <strong>Protocolos de Rede</strong>
          <span>TCP/IP, DHCP, DNS, HTTP</span>
        </div>
        <div className="spec-item">
          <strong>Segurança Wi-Fi</strong>
          <span>WPA2-Pessoal e WPA2-Enterprise</span>
        </div>
        <div className="spec-item">
          <strong>Alimentação</strong>
          <span>5V DC (Micro-USB ou Conector P4)</span>
        </div>
        <div className="spec-item">
          <strong>Dimensões</strong>
          <span>Aprox. 8cm x 5cm x 2.5cm</span>
        </div>
        <div className="spec-item">
          <strong>Indicadores</strong>
          <span>LEDs de Status (Pwr, Wi-Fi, Link Ethernet, Dados)</span>
        </div>
      </div>
    </div>
  </section>
);

// =============================
// SOBRE O CRIADOR (AboutUs) - Mantido igual
// =============================
const AboutUs = () => {
    const calculateAge = (birthDateString) => {
      const birthDate = new Date(birthDateString);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };
    
    const age = calculateAge('2000-12-11');

    return (
      <section id="sobrenos">
        <div className="container">
          <h2>Sobre o Criador</h2>
          <div className="about-us-content">
            <div className="profile-card">
              <div className="profile-info">
                <h3>Wesley Davi Zanon Novaes</h3>
                <p><strong>Desenvolvedor de Software</strong></p>
                <p>{age} anos, Brasileiro</p>
                <p>Cursando Engenharia de Computação na Facens (Conclusão: Dez/2025)</p>
                <p>Sorocaba - SP, Brasil</p>
              </div>
            </div>
            <div className="mission-statement">
              <h4>Nossa Missão</h4>
              <p>Este projeto nasceu de uma visão acadêmica com o objetivo de tornar a automação industrial acessível e confiável. Acredito que a tecnologia híbrida é a chave para garantir que processos críticos, como a pesagem, nunca parem, impulsionando a eficiência de pequenas e médias empresas.</p>
            </div>
          </div>
        </div>
      </section>
    );
};

// =============================
// CONTATO (Contact) - Mantido igual
// =============================
const Contact = () => (
  <section id="contato">
    <div className="container contact-content">
      <h2>Entre em Contato</h2>
      <p>Tem alguma dúvida ou interesse em nossa solução híbrida? Fale comigo.</p>
       <div className="contact-links">
        <a href="mailto:wesleyzanon.dev@gmail.com" className="contact-link">📧 Email Principal</a>
        <a href="mailto:wesleyzanon17@gmail.com" className="contact-link">✉️ Email Secundário</a>
        <a href="https://wa.me/5511965835656" target="_blank" rel="noopener noreferrer" className="contact-link">💬 WhatsApp</a>
        <a href="https://instagram.com/poxazanon" target="_blank" rel="noopener noreferrer" className="contact-link">📸 Instagram</a>
      </div>
    </div>
  </section>
);

// =============================
// RODAPÉ (Footer) - Mantido igual
// =============================
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p>© {new Date().getFullYear()} Digital Integration | Desenvolvido por Wesley Davi Zanon Novaes.</p>
    </div>
  </footer>
);

// =============================
// RENDERIZAÇÃO
// =============================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
