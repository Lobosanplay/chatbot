import type { Metadata } from "next";

import "./globals.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Quantum AI Assistant",
  description: "AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Quantum AI Assistant</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      </head>
      <body suppressHydrationWarning>
        <div className={styles['app-container']}>
            {/* <!-- Sidebar 3D --> */}
            <div className={styles.sidebar}>
                <div className={styles['sidebar-header']}>
                    <div className={styles.logo}>
                        <div className={`${styles['logo-icon']} animate__animated animate__pulse animate__infinite`}>
                            <i className='fas fa-atom'></i>
                        </div>
                        <span>Quantum AI</span>
                    </div>
                    <button className={`${styles['new-chat-btn']} ${styles['glow-on-hover']}`}>
                        <i className='fas fa-plus' /> Nueva conversación
                    </button>
                </div>

                <div className={styles['search-container']}>
                    <input type="text" placeholder="Buscar conversaciones..." />
                    <i className='fas fa-search' />
                </div>

                <div className={styles['chat-history']}>
                    <div className={styles['history-section']}>
                        <div className={styles['section-title']}>Hoy</div>
                        <div className={`${styles['history-item']} ${styles['active']}`} data-theme="tech">
                            <div className={`${styles['item-icon']} ${styles['tech-bg']}`}>
                                <i className={'fas  fa-microchip'}></i>
                            </div>
                            <div className={styles['item-details']}>
                                <span className={styles['item-title']}>Soporte Técnico</span>
                                <span className={styles['item-preview']}>Cómo solucionar el error...</span>
                            </div>
                            <span className={styles['item-time']}>10:45 AM</span>
                        </div>
                        <div className={styles['history-item']} data-theme="creative">
                            <div className={`${styles['item-icon']} ${styles['creative-bg']}`}>
                                <i className={'fas  fa-paint-brush'}></i>
                            </div>
                            <div className={styles['item-details']}>
                                <span className={styles['item-title']}>Ideas Creativas</span>
                                <span className={styles['item-preview']}>Diseño de logo para...</span>
                            </div>
                            <span className={styles['item-time']}>9:30 AM</span>
                        </div>
                    </div>

                    <div className={styles['history-section']}>
                        <div className={styles['section-title']}>Ayer</div>
                        <div className={styles['history-item']} data-theme="business">
                            <div className={`${styles['item-icon']} ${styles['business-bg']}`}>
                                <i className={'fas  fa-chart-line'}></i>
                            </div>
                            <div className={styles['item-details']}>
                                <span className={styles['item-title']}>Análisis de Mercado</span>
                                <span className={styles['item-preview']}>Tendencias Q2 2023...</span>
                            </div>
                            <span className={styles['item-time']}>5:20 PM</span>
                        </div>
                    </div>
                </div>

                <div className={styles['ai-modes']}>
                    <div className={styles['mode-title']}>Modo AI</div>
                    <div className={styles['mode-options']}>
                        <div className={`${styles['mode-option']} ${styles['active']}`} data-mode="balanced">
                            <i className={'fas  fa-scale-balanced'}></i>
                            <span>Equilibrado</span>
                        </div>
                        <div className={styles['mode-option']} data-mode="creative">
                            <i className={'fas  fa-lightbulb'}></i>
                            <span>Creativo</span>
                        </div>
                        <div className={styles['mode-option']} data-mode="precise">
                            <i className={'fas  fa-bullseye'}></i>
                            <span>Preciso</span>
                        </div>
                    </div>
                </div>

                <div className={styles['user-profile']}>
                    <div className={styles['avatar-container']}>
                        <div className={styles['avatar-ring']}>
                            <img src="https://i.pravatar.cc/150?img=5" alt="Usuario" />
                        </div>
                        <div className={`${styles['status-dot']} ${styles['online']}`}></div>
                    </div>
                    <div className={styles['user-info']}>
                        <span className={styles['username']}>Alex Johnson</span>
                        <span className={styles['user-plan']}>Plan Pro</span>
                    </div>
                    <button className={styles['settings-btn']}>
                        <i className={'fas  fa-cog'}></i>
                    </button>
                </div>
            </div>
            
            {children}

            {/* <!-- Right Panel --> */}
            <div className={styles['right-panel']}>
                <div className={styles['panel-header']}>
                    <h3>Herramientas</h3>
                    <button className={styles['close-panel']}>
                        <i className={'fas fa-times'}></i>
                    </button>
                </div>
                <div className={styles['panel-tabs']}>
                    <div className={`${styles['tab']} ${styles['active']}`} data-tab="files">
                        <i className={'fas fa-file'}></i>
                        <span>Archivos</span>
                    </div>
                    <div className={styles['tab']} data-tab="web">
                        <i className={'fas fa-globe'}></i>
                        <span>Web</span>
                    </div>
                    <div className={styles['tab']} data-tab="plugins">
                        <i className={'fas fa-puzzle-piece'}></i>
                        <span>Plugins</span>
                    </div>
                </div>
                <div className={styles['panel-content']}>
                    <div className={`${styles['tab-content']} ${styles['active']}`} id="files-tab">
                        <div className={styles['file-upload-area']}>
                            <i className={'fas fa-cloud-upload-alt'}></i>
                            <p>Arrastra archivos aquí o haz clic para subir</p>
                            <input type="file" id="file-upload" multiple />
                        </div>
                        <div className={styles['file-list']}>
                            <div className={styles['file-item']}>
                                <div className={styles['file-icon']}>
                                    <i className={'fas fa-file-pdf'}></i>
                                </div>
                                <div className={styles['file-info']}>
                                    <span className={styles['file-name']}>Informe_Q2.pdf</span>
                                    <span className={styles['file-size']}>2.4 MB</span>
                                </div>
                                <button className={styles['file-action']}>
                                    <i className={'fas fa-ellipsis-vertical'}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Floating Elements --> */}
        <div className={styles['floating-notification']}>
            <div className={styles['notification-content']}>
                <i className={'fas fa-bolt'}></i>
                <div className={styles['notification-text']}>
                    <strong>Nueva actualización disponible</strong>
                    <span>Versión 2.3.1 con mejoras de rendimiento</span>
                </div>
                <button className={styles['notification-close']}>
                    <i className={'fas fa-times'}></i>
                </button>
            </div>
        </div>

        <div className={styles['floating-action-btn']}>
            <i className={'fas fa-magic'}></i>
        </div>
      </body>
    </html>
  );
}
