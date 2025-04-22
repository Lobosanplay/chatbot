import styles from "./page.module.css";

export default function Home() {

  return (
    <div>
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

          {/* <!-- Main Chat Area --> */}
          <div className={styles['chat-container']}>
              {/* <!-- Chat Header --> */}
              <div className={styles['chat-header']}>
                  <div className={styles['chat-info']}>
                      <div className={`${styles['avatar-container']} ${styles['bot-avatar']}`}>
                          <div className={`${styles['avatar-ring']} ${styles['pulse-animation']}`}>
                              <i className={'fas  fa-robot'}></i>
                          </div>
                          <div className={`${styles['status-dot']} ${styles['online']}`}></div>
                      </div>
                      <div className={styles['chat-details']}>
                          <h2>Quantum Assistant</h2>
                          <div className={styles['chat-meta']}>
                              <span className={styles['model-version']}>GPT-4 Turbo</span>
                              <span className={styles['context-tokens']}>128k contexto</span>
                          </div>
                      </div>
                  </div>
                  <div className={styles['chat-actions']}>
                      <button className={styles['action-btn']} title="Compartir">
                          <i className={'fas  fa-share-nodes'}></i>
                      </button>
                      <button className={styles['action-btn']} title="Archivar">
                          <i className={'fas  fa-archive'}></i>
                      </button>
                      <div className={styles['dropdown']}>
                          <button className={styles['action-btn']} title="Más opciones">
                              <i className={'fas  fa-ellipsis-vertical'}></i>
                          </button>
                          <div className={styles['dropdown-content']}>
                              <a href="#"><i className={'fas  fa-moon'}></i> Modo Oscuro</a>
                              <a href="#"><i className={'fas  fa-sliders'}></i> Configuración</a>
                              <a href="#"><i className={'fas  fa-bug'}></i> Reportar problema</a>
                          </div>
                      </div>
                  </div>
              </div>

              {/* <!-- Chat Messages --> */}
              <div className={styles['chat-messages']} id="chat-messages">
                  <div className={styles['welcome-section']}>
                      <div className={styles['welcome-icon']}>
                          <i className={'fas  fa-robot'}></i>
                      </div>
                      <h3>¡Hola, soy Quantum AI!</h3>
                      <p>Tu asistente de inteligencia artificial de última generación. Puedo ayudarte con:</p>
                      <div className={styles['suggestion-chips']}>
                          <div className={styles['chip']}>Redactar un correo</div>
                          <div className={styles['chip']}>Generar código</div>
                          <div className={styles['chip']}>Analizar datos</div>
                          <div className={styles['chip']}>Brainstorming</div>
                      </div>
                  </div>

                  <div className={styles['message-date']}>HOY</div>

                  <div className={`${styles['message']} ${styles['bot-message']}`}>
                      <div className={`${styles['avatar-container']} ${styles['bot-avatar']}`}>
                          <div className={styles['avatar-ring']}>
                              <i className={'fas  fa-robot'}></i>
                          </div>
                      </div>
                      <div className={styles['message-content']}>
                          <div className={styles['message-text']}>¡Hola! 👋 Soy Quantum AI, tu asistente personal. Estoy aquí para ayudarte con lo que necesites. ¿Por dónde quieres empezar hoy?</div>
                          <div className={styles['message-footer']}>
                              <span className={styles['message-time']}>10:00 AM</span>
                              <div className={styles['message-actions']}>
                                  <button className={styles['action-btn']} title="Regenerar"><i className={'fas  fa-arrows-rotate'}></i></button>
                                  <button className={styles['action-btn']} title="Copiar"><i className={'far fa-copy'}></i></button>
                                  <button className={styles['action-btn']} title="Me gusta"><i className={'far fa-thumbs-up'}></i></button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* <!-- Chat Input --> */}
              <form id="chat-form" method="POST" action="/chat"> 
                <div className={styles['chat-input-container']}>
                    <div className={styles['input-tools']}>
                        <button className={styles['tool-btn']} title="Adjuntar archivo">
                            <i className={'fas fa-paperclip'}></i>
                        </button>
                        <button className={styles['tool-btn']} title="Grabar audio">
                            <i className={'fas fa-microphone'}></i>
                        </button>
                        <button className={`${styles['tool-btn']} ${styles['emoji-btn']}`} title="Emojis">
                            <i className={'far fa-smile'}></i>
                        </button>
                    </div>
                    <div className={styles['message-input-wrapper']}>
                        <textarea id="user-input" name="user-input" placeholder="Escribe un mensaje..." rows={1}></textarea>
                        <div className={styles['input-suggestions']}>
                            <span>Sugerencias:</span>
                            <div className={styles['suggestion']}>¿Cómo puedo mejorar mi productividad?</div>
                            <div className={styles['suggestion']}>Explícame como funciona ChatGPT</div>
                        </div>
                    </div>
                    <button id="send-button" className={`${styles['send-btn']} ${styles['floating-btn']}`}>
                        <i className={'fas fa-paper-plane'}></i>
                    </button>
                </div>
              </form>
          </div>

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

      {/* <!-- Emoji Picker (hidden by default) --> */}
      <div className={styles['emoji-picker']}>
          <div className={styles['emoji-categories']}>
              <button className={`${styles['category-btn']} ${styles['active']}`}><i className={'far fa-smile'}></i></button>
              <button className={styles['category-btn']}><i className={'far fa-laugh-squint'}></i></button>
              <button className={styles['category-btn']}><i className={'far fa-surprise'}></i></button>
          </div>
          <div className={styles['emoji-grid']}>
              {/* <!-- Emojis would be inserted here by JavaScript --> */}
          </div>
      </div>
    </div>
  );
}
