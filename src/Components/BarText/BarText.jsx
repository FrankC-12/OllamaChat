// import { useState, useEffect, useRef } from 'react';
// import './BarText.css';
// import img from '../../assets/image/send.png';
// import Welcome from '../ChatMessage/Welcome';
// import Navbar from '../Navbar/NavBar'


// function BarText() {
//     const [message, setMessage] = useState('');
//     const [chatHistory, setChatHistory] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [showWelcome, setShowWelcome] = useState(true);

//     const chatHistoryRef = useRef(null);  // Ref para el contenedor de la historia del chat
//     const lastMessageRef = useRef(null);

//     // Cambia la URL de tu API aquí
//     const API_URL = 'http://127.0.0.1:5000'; // Reemplaza esto con tu URL de Render

//     // Función para obtener el historial del día actual al cargar la página
//     const loadTodayHistory = async () => {
//         try {
//             const response = await fetch(`${API_URL}/history/today`, {  // Cambié la URL aquí
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
//             const data = await response.json();
//             if (data.history) {
//                 const history = [];
//                 for (let item of data.history) {
//                     history.push({
//                         role: 'user',
//                         content: item.userMessage,
//                         timestamp: item.timestamp,
//                     });
//                     history.push({
//                         role: 'bot',
//                         content: item.botResponse,
//                         timestamp: item.timestamp,
//                     });
//                 }
//                 setChatHistory(history);
//             }
//         } catch (error) {
//             console.error("Error al cargar el historial:", error);
//         }
//     };

    

//     const handleSend = async (presetMessage = null) => {
//         const messageToSend = presetMessage || message.trim();
//         if (messageToSend === '') return;
    
//         const timestamp = new Date();
    
//         const userMessage = {
//             role: 'user',
//             content: messageToSend,
//             timestamp: timestamp.toISOString(),
//         };
    
//         const updatedChatHistory = [...chatHistory, userMessage];
    
//         if (showWelcome) {
//             setShowWelcome(false);
//         }
    
//         setChatHistory(updatedChatHistory);
//         setMessage('');
//         setLoading(true);
    
//         try {
//             const response = await fetch(`${API_URL}/ai`, {  // Cambié la URL aquí
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Access-Control-Allow-Origin': '*'
//                 },
//                 body: JSON.stringify({ message: messageToSend }),
//             });
    
//             if (!response.ok) {
//                 throw new Error('Failed to fetch data');
//             }
    
//             const data = await response.json();
//             setChatHistory([...updatedChatHistory, {
//                 role: 'bot',
//                 content: data.response,
//                 timestamp: timestamp.toISOString(),
//             }]);
//         } catch (error) {
//             console.error('Error fetching data:', error); 
//             setChatHistory([...updatedChatHistory, {
//                 role: 'bot',
//                 content: 'Lo siento, ocurrió un error.',
//                 timestamp: timestamp.toISOString(),
//             }]);
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     const hideWelcomeMessage = () => {
//         setShowWelcome(false);
//     };

//     const renderContent = (text) => {
//         const formatText = (text) => {
//             return text.split(/\*\*(.*?)\*\*/g).map((part, index) => {
//                 if (index % 2 === 1) {
//                     return <strong key={index}>{part}</strong>;
//                 } else {
//                     const lines = part.split('\n');
//                     return (
//                         <>
//                             {lines.map((line, i) => {
//                                 const matchNumbered = line.match(/^(\d+)\. (.+)$/);
//                                 if (matchNumbered) {
//                                     return <li key={i}>{matchNumbered[2]}</li>;
//                                 }

//                                 const matchBullet = line.match(/^\* (.+)$/);
//                                 if (matchBullet) {
//                                     return <li key={i}>{matchBullet[1]}</li>;
//                                 }

//                                 return <p key={i}>{line}</p>;
//                             })}
//                         </>
//                     );
//                 }
//             });
//         };

//         const lines = text.split('\n');
//         const content = lines.reduce((acc, line, index) => {
//             const matchNumbered = line.match(/^(\d+)\. (.+)$/);
//             const matchBullet = line.match(/^\* (.+)$/);

//             if (matchNumbered) {
//                 if (acc.lastType === 'numbered') {
//                     acc.items.push(<li key={index}>{matchNumbered[2]}</li>);
//                 } else {
//                     if (acc.items.length) {
//                         acc.elements.push(<ol key={acc.elements.length}>{acc.items}</ol>);
//                     }
//                     acc.items = [<li key={index}>{matchNumbered[2]}</li>];
//                     acc.lastType = 'numbered';
//                 }
//             } else if (matchBullet) {
//                 if (acc.lastType === 'bullet') {
//                     acc.items.push(<li key={index}>{matchBullet[1]}</li>);
//                 } else {
//                     if (acc.items.length) {
//                         acc.elements.push(<ul key={acc.elements.length}>{acc.items}</ul>);
//                     }
//                     acc.items = [<li key={index}>{matchBullet[1]}</li>];
//                     acc.lastType = 'bullet';
//                 }
//             } else {
//                 if (acc.items.length) {
//                     if (acc.lastType === 'numbered') {
//                         acc.elements.push(<ol key={acc.elements.length}>{acc.items}</ol>);
//                     } else if (acc.lastType === 'bullet') {
//                         acc.elements.push(<ul key={acc.elements.length}>{acc.items}</ul>);
//                     }
//                     acc.items = [];
//                 }
//                 acc.elements.push(<p key={index}>{formatText(line)}</p>);
//                 acc.lastType = null;
//             }

//             return acc;
//         }, { elements: [], items: [], lastType: null });

//         if (content.items.length) {
//             if (content.lastType === 'numbered') {
//                 content.elements.push(<ol key={content.elements.length}>{content.items}</ol>);
//             } else if (content.lastType === 'bullet') {
//                 content.elements.push(<ul key={content.elements.length}>{content.items}</ul>);
//             }
//         }

//         return (
//             <div>
//                 {content.elements}
//             </div>
//         );
//     };

//     useEffect(() => {
//         if (lastMessageRef.current) {
//             lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     }, [chatHistory, loading]);

//     return (
//         <div>
//             <Navbar onSendMessage={handleSend} chatHistory={chatHistory} loadTodayHistory={loadTodayHistory} hideWelcomeMessage={hideWelcomeMessage}/>
//             <div className='chat_history' ref={chatHistoryRef}>
//                 {showWelcome && (
//                     <div className="welcome-message">
//                         <Welcome />
//                     </div>
//                 )}
//                 {chatHistory.map((msg, index) => (
//                     <div key={index} className={msg.role === 'user' ? 'user-message' : 'bot-message'} ref={index === chatHistory.length - 1 ? lastMessageRef : null}>
//                         <div>
//                             {renderContent(msg.content)}
//                         </div>
//                     </div>
//                 ))}
//                 {loading && (
//                     <div className="loader">
//                         <div className="dot"></div>
//                         <div className="dot"></div>
//                         <div className="dot"></div>
//                     </div>
//                 )}
//             </div>
//             <div className='bar_text'>
//                 <textarea
//                     className='text'
//                     id="message"
//                     name="message"
//                     rows="4"
//                     cols="50"
//                     placeholder="Send a message to DevShorty"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <img className='send' src={img} onClick={() => handleSend()} alt="send" />
//             </div>
//         </div>
//     );
// }

// export default BarText;

import { useState, useEffect, useRef } from 'react';
import './BarText.css';
import img from '../../assets/image/send.png';
import Welcome from '../ChatMessage/Welcome';
import Navbar from '../Navbar/NavBar'

function BarText() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [historyVisible, setHistoryVisible] = useState(false); // Estado para controlar la visibilidad del historial
    const [history, setHistory] = useState([]); // Estado para almacenar el historial de consultas

    const chatHistoryRef = useRef(null);  // Ref para el contenedor de la historia del chat
    const lastMessageRef = useRef(null);

    // Cambia la URL de tu API aquí
    const API_URL = 'http://127.0.0.1:5000'; // Reemplaza esto con tu URL de Render

    // Función para obtener el historial del día actual
    const loadTodayHistory = async () => {
        try {
            const response = await fetch(`${API_URL}/history/today`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            if (data.history) {
                const historyData = [];
                for (let item of data.history) {
                    historyData.push({
                        role: 'user',
                        content: item.userMessage,
                        timestamp: item.timestamp,
                    });
                    historyData.push({
                        role: 'bot',
                        content: item.botResponse,
                        timestamp: item.timestamp,
                    });
                }
                setHistory(historyData); // Almacenar el historial en un estado separado
            }
        } catch (error) {
            console.error("Error al cargar el historial:", error);
        }
    };

    const handleSend = async (presetMessage = null) => {
        const messageToSend = presetMessage || message.trim();
        if (messageToSend === '') return;

        const timestamp = new Date();

        const userMessage = {
            role: 'user',
            content: messageToSend,
            timestamp: timestamp.toISOString(),
        };

        const updatedChatHistory = [...chatHistory, userMessage];

        if (showWelcome) {
            setShowWelcome(false);
        }

        setChatHistory(updatedChatHistory);
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/ai`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ message: messageToSend }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setChatHistory([...updatedChatHistory, {
                role: 'bot',
                content: data.response,
                timestamp: timestamp.toISOString(),
            }]);
        } catch (error) {
            console.error('Error fetching data:', error); 
            setChatHistory([...updatedChatHistory, {
                role: 'bot',
                content: 'Lo siento, ocurrió un error.',
                timestamp: timestamp.toISOString(),
            }]);
        } finally {
            setLoading(false);
        }
    };

    const toggleHistoryVisibility = () => {
        setHistoryVisible(!historyVisible);
        if (!historyVisible) {
            loadTodayHistory(); // Cargar el historial al abrir el modal
            setShowWelcome(false); // Ocultar el mensaje de bienvenida
        }
    };

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory, loading]);

    return (
        <div>
            <Navbar 
                onSendMessage={handleSend} 
                chatHistory={chatHistory} 
                loadTodayHistory={loadTodayHistory} 
                toggleHistoryVisibility={toggleHistoryVisibility} // Pasar función para alternar visibilidad del historial
            />
            <div className='chat_history' ref={chatHistoryRef}>
                {showWelcome && (
                    <div className="welcome-message">
                        <Welcome />
                    </div>
                )}
                {chatHistory.map((msg, index) => (
                    <div key={index} className={msg.role === 'user' ? 'user-message' : 'bot-message'} ref={index === chatHistory.length - 1 ? lastMessageRef : null}>
                        <div>
                            {/* Aquí puedes renderizar el contenido de los mensajes */}
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="loader">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                )}
            </div>
            <div className='bar_text'>
                <textarea
                    className='text'
                    id="message"
                    name="message"
                    rows="4"
                    cols="50"
                    placeholder="Send a message to DevShorty"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <img className='send' src={img} onClick={() => handleSend()} alt="send" />
            </div>
            {historyVisible && (
                <div className="history-modal">
                    <h2>Query History</h2>
                    <ul>
                        {history.map((entry, index) => (
                            <li key={index}>
                                <strong>{entry.role === 'user' ? 'Usuario' : 'Bot'}:</strong> {entry.content}
                                <small className='fecha'>
                                    {entry.timestamp}
                                </small>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default BarText;



