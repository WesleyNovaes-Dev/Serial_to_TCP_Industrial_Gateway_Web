import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

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
      // FIX: Cast the result of querySelector to HTMLElement to access offsetHeight.
      const headerOffset = (document.querySelector('.header') as HTMLElement)?.offsetHeight || 70;
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

const Header = ({ menuOpen, toggleMenu, onLinkClick, activeSection }) => {
  const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#projeto', label: 'O Projeto' },
    { href: '#comousar', label: 'Como Usar' },
    { href: '#configuracao-detalhada', label: 'Configuração Detalhada' },
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

const Hero = () => (
  <section id="inicio">
    <div className="container hero-content">
      <h1>Conecte. Automatize. Otimize.</h1>
      <p>Modernize suas balanças seriais e integre-as à sua rede com nossa solução plug-and-play. Elimine erros manuais e ganhe eficiência.</p>
      <a href="#projeto" className="btn">Saiba Mais</a>
    </div>
  </section>
);

const ProjectInfo = () => (
  <section id="projeto">
    <div className="container">
      <h2>O Desafio da Conectividade Industrial</h2>
      <p>Dispositivos de medição legados, como balanças industriais, frequentemente carecem de conectividade, dependendo de portas seriais que exigem inserção manual de dados em sistemas de gestão. Este processo é lento, ineficiente e propenso a erros, representando uma barreira para a modernização.</p>
      <div className="project-grid">
        <FeatureCard 
          icon="🔌" 
          title="Fácil Instalação" 
          description="Conecte e configure em minutos. Nossa solução é plug-and-play, projetada para integração imediata sem complicações." 
        />
        <FeatureCard 
          icon="💻" 
          title="Integração com ERP" 
          description="Transmita dados de pesagem diretamente para seu sistema ERP, automatizando processos e garantindo a precisão das informações." 
        />
        <FeatureCard 
          icon="💰" 
          title="Baixo Custo" 
          description="Uma alternativa econômica à substituição de equipamentos caros, democratizando o acesso às vantagens da Indústria 4.0." 
        />
         <FeatureCard 
          icon="🌐" 
          title="Configuração Web" 
          description="Interface de configuração web intuitiva, acessível por qualquer navegador, para um gerenciamento de rede simples e rápido." 
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


const HowToUse = () => (
  <section id="comousar">
    <div className="container">
      <h2>Instalação em 3 Passos Simples</h2>
      <div className="how-to-use-timeline">
        <div className="timeline-item">
          <div className="timeline-content">
            <span className="step">Passo 1</span>
            <h3>Conecte o Hardware</h3>
            <p>Conecte o dispositivo à sua balança usando a porta serial e ligue-o a uma fonte de energia.</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
             <span className="step">Passo 2</span>
            <h3>Configure a Rede</h3>
            <p>Use seu celular ou computador para se conectar à rede Wi-Fi do dispositivo e acesse a interface web para configurar sua rede local.</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">
             <span className="step">Passo 3</span>
            <h3>Receba os Dados</h3>
            <p>Uma vez conectado, o dispositivo começa a transmitir os dados de pesagem pela sua rede, pronto para ser integrado ao seu sistema.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DetailedConfig = () => (
  <section id="configuracao-detalhada">
    <div className="container">
      <h2>Configuração Detalhada</h2>
      <p>Siga este guia passo a passo para configurar seu dispositivo ScaleConnect e integrá-lo à sua rede.</p>
      <div className="config-grid">
        <div className="config-step">
          <h3>Passo 1: Conexão Inicial (Modo Ponto de Acesso)</h3>
          <p>Ao ser ligado pela primeira vez, o dispositivo cria sua própria rede Wi-Fi para configuração inicial. Este é o Modo Ponto de Acesso (AP).</p>
          <ul>
            <li>Procure por redes Wi-Fi em seu celular ou computador.</li>
            <li>Conecte-se à rede com o nome (SSID): <strong>ScaleConnect</strong>.</li>
            <li>Nenhuma senha é necessária para esta conexão inicial.</li>
          </ul>
        </div>

        <div className="config-step">
          <h3>Passo 2: Acessando a Interface Web</h3>
          <p>Uma vez conectado à rede "ScaleConnect", abra seu navegador de internet.</p>
          <ul>
            <li>Digite o seguinte endereço IP na barra de endereços: <code>192.168.4.1</code></li>
            <li>Você será solicitado a inserir uma senha para acessar as configurações.</li>
            <li>A senha padrão é: <code>123456</code></li>
          </ul>
        </div>

        <div className="config-step">
          <h3>Passo 3: Escolhendo o Modo de Rede</h3>
          <p>Na interface, você poderá escolher como o dispositivo se conectará permanentemente.</p>
          <ul>
            <li><strong>Modo Cliente (Recomendado):</strong> O dispositivo se conecta à sua rede Wi-Fi existente (ex: a rede do seu escritório ou fábrica). Você precisará selecionar o nome da sua rede (SSID) e inserir a senha dela. Esta opção integra o dispositivo à sua infraestrutura local.</li>
            <li><strong>Modo Ponto de Acesso:</strong> O dispositivo continua a funcionar como um roteador Wi-Fi independente. Use esta opção se não houver uma rede Wi-Fi disponível no local. Seus sistemas terão que se conectar diretamente à rede "ScaleConnect" para receber os dados.</li>
          </ul>
        </div>
        
        <div className="config-step">
            <h3>Passo 4: Salvar, Reiniciar e Conectar</h3>
            <p>Após escolher o modo e inserir os dados (se aplicável), salve as configurações. O dispositivo irá reiniciar.</p>
            <ul>
                <li>Aguarde alguns instantes. Os LEDs no dispositivo indicarão o status da conexão.</li>
                <li>Se configurado como Cliente, ele tentará se conectar à sua rede Wi-Fi. Um LED de status ficará aceso continuamente após a conexão bem-sucedida.</li>
            </ul>
        </div>

        <div className="config-step">
            <h3>Passo 5: Acessando pelo Novo IP</h3>
            <p>Se você configurou o Modo Cliente, seu roteador atribuirá um novo endereço IP ao dispositivo. Para acessá-lo novamente:</p>
            <ul>
                <li>Acesse a página de administração do seu roteador para encontrar a lista de dispositivos conectados e identificar o IP do ScaleConnect.</li>
                <li>Ou, use um aplicativo de escaneamento de rede em seu celular ou computador.</li>
                <li>Acesse a interface de configuração usando este <strong>novo IP</strong>. A senha de acesso (<code>123456</code>) permanece a mesma.</li>
            </ul>
        </div>

        <div className="config-step">
          <h3>Passo 6: Configurando a Transmissão de Dados</h3>
          <p>Com o dispositivo na sua rede, configure como os dados da balança serão enviados.</p>
          <ul>
            <li><strong>Servidor TCP (Socket):</strong> O dispositivo escuta em uma porta de rede específica (ex: porta 8080). Seu sistema ERP ou software personalizado pode se conectar diretamente ao IP do dispositivo e a essa porta para receber um fluxo contínuo de dados de pesagem. É uma conexão direta e de baixa latência.</li>
            <li><strong>API (HTTP POST):</strong> O dispositivo envia os dados de pesagem para um endereço web (endpoint de API) que você especificar. A cada nova pesagem, ele faz uma requisição HTTP POST com os dados em um formato estruturado (ex: JSON). Ideal para integração com sistemas modernos baseados na web.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const TechnicalSpecs = () => (
  <section id="especificacoes">
    <div className="container">
      <h2>Especificações Técnicas</h2>
      <div className="specs-grid">
        <div className="spec-item">
          <strong>Conectividade</strong>
          <span>Wi-Fi 802.11 b/g/n</span>
        </div>
        <div className="spec-item">
          <strong>Interface Física</strong>
          <span>Serial RS232 (DB9) / USB</span>
        </div>
        <div className="spec-item">
          <strong>Protocolos de Rede</strong>
          <span>TCP/IP, DHCP, DNS</span>
        </div>
        <div className="spec-item">
          <strong>Segurança Wi-Fi</strong>
          <span>WPA2-Pessoal e WPA2-Enterprise</span>
        </div>
        <div className="spec-item">
          <strong>Gerenciamento</strong>
          <span>Interface Web embarcada para configuração</span>
        </div>
        <div className="spec-item">
          <strong>Alimentação</strong>
          <span>5V DC (Micro-USB ou P4)</span>
        </div>
        <div className="spec-item">
          <strong>Dimensões</strong>
          <span>8cm x 5cm x 2.5cm</span>
        </div>
        <div className="spec-item">
          <strong>Consumo de Energia</strong>
          <span>&lt; 2W</span>
        </div>
        <div className="spec-item">
          <strong>Indicadores LED</strong>
          <span>Alimentação, Conexão Wi-Fi, Atividade Serial</span>
        </div>
        <div className="spec-item">
          <strong>Firmware</strong>
          <span>Atualizável via OTA (Over-The-Air)</span>
        </div>
      </div>
    </div>
  </section>
);


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
              <p>Este projeto nasceu de uma visão acadêmica com o objetivo de tornar a automação industrial acessível. Acredito que a tecnologia pode simplificar processos e impulsionar o crescimento de pequenas e médias empresas. Sou apaixonado por inovação e dedicado a criar soluções robustas e fáceis de usar.</p>
            </div>
          </div>
        </div>
      </section>
    );
};

const Contact = () => (
  <section id="contato">
    <div className="container contact-content">
      <h2>Entre em Contato</h2>
      <p>Tem alguma dúvida ou interesse em nosso produto? Fale comigo.</p>
       <div className="contact-links">
        <a href="mailto:wesleyzanon.dev@gmail.com" className="contact-link">📧 Email Principal</a>
        <a href="mailto:wesleyzanon17@gmail.com" className="contact-link">✉️ Email Secundário</a>
        <a href="https://wa.me/5511965835656" target="_blank" rel="noopener noreferrer" className="contact-link">💬 WhatsApp</a>
        <a href="https://instagram.com/poxazanon" target="_blank" rel="noopener noreferrer" className="contact-link">📸 Instagram</a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p>© {new Date().getFullYear()} Digital Integration | Desenvolvido por Wesley Davi Zanon Novaes.</p>
    </div>
  </footer>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);