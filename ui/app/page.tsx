import styles from "./page.module.css";

export default function Home() {

  return (
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
