// import React, { useState } from 'react';
// import './NavBar.css';
// import img1 from '../../assets/image/menu.png';
// import img2 from '../../assets/image/logo.png';
// import img3 from '../../assets/image/query.png';
// import img4 from '../../assets/image/back.png';
// import { format } from 'date-fns';

// function Navbar({ onSendMessage, chatHistory, loadTodayHistory, hideWelcomeMessage}) {
//     const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
//     const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
//     // const [todayHistory, setTodayHistory] = useState([]);

//     const toggleMenuModal = () => {
//         setIsMenuModalOpen(!isMenuModalOpen);
//     };

//     // const toggleHistoryModal = () => {
//     //     setIsHistoryModalOpen(!isHistoryModalOpen);
       
//     // };
//     const toggleHistoryModal = async () => {
//         setIsHistoryModalOpen(!isHistoryModalOpen);
        
//         if (!isHistoryModalOpen) {
//             // Cargar el historial de la fecha actual solo si se abre el modal
//             await loadTodayHistory();
//             hideWelcomeMessage();
//         }
//     };


//     const handleSelection = (level) => {
//         toggleMenuModal();
//         let message = '';
//         if (level === 'Basic') {
//             message = 'I want to learn the basic shortcuts of NetBeans';
//         } else if (level === 'Intermediate') {
//             message = 'I want to learn the intermediate shortcuts of NetBeans';
//         } else if (level === 'Advanced') {
//             message = 'I want to learn the advanced shortcuts of NetBeans';
//         }

//         onSendMessage(message);
//     };

//     const formatTimestamp = (timestamp) => {
//         return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
//     };

//     return (
//         <div className='navbar'>
//             <img className='menu' src={img1} onClick={toggleMenuModal} alt="menu" />
//             <img className='logo' src={img2} alt="logo" />

//             {isMenuModalOpen && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <img className='menu' src={img1} onClick={toggleMenuModal} alt="menu" />
//                         <h1 className='title-modal'>Shortcut List</h1>
//                         <ul>
//                             <li onClick={() => handleSelection('Basic')}>Basic</li>
//                             <li onClick={() => handleSelection('Intermediate')}>Intermediate</li>
//                             <li onClick={() => handleSelection('Advanced')}>Advanced</li>
//                         </ul>
//                         <div className='query_space'>
//                             <h1 onClick={toggleHistoryModal} style={{ cursor: 'pointer' }} className='consultas'>
//                                 <span>Query</span><br /><span>History</span>
//                             </h1>
//                             <img className='query' src={img3} alt="query" />
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {isHistoryModalOpen && (
//     <div className="modal">
//         <div className="modal-content">
//             <img className='back' src={img4} onClick={toggleHistoryModal} alt="back" />
//             <h1 className='query_modal'>Query History</h1>

//             <div className="history-container">
//                 {chatHistory.length === 0 ? (
//                     <p className='no_query'>There are no queries registered today</p>
//                 ) : (
//                     <ul>
//                         {chatHistory.map((entry, index) => (
//                             <li key={index}>
//                                 <strong>{entry.role === 'user' ? 'Usuario' : 'Bot'}:</strong> {entry.content}
//                                 <small className='fecha'>
//                                     {'\n'}{'\n'}
//                                     {entry.timestamp ? formatTimestamp(entry.timestamp) : 'Sin fecha'}
//                                     {'\n'}
//                                 </small>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     </div>
// )}
//         </div>
//     );
// }

// export default Navbar;

import React, { useState, useEffect } from 'react';
import './NavBar.css';
import img1 from '../../assets/image/menu.png';
import img2 from '../../assets/image/logo.png';
import img3 from '../../assets/image/query.png';
import img4 from '../../assets/image/back.png';
import { format } from 'date-fns';

function Navbar({ onSendMessage, chatHistory, loadTodayHistory, toggleHistoryVisibility }) {
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [localChatHistory, setLocalChatHistory] = useState([]);

    const toggleMenuModal = () => {
        setIsMenuModalOpen(!isMenuModalOpen);
    };

    const toggleHistoryModal = async () => {
        setIsHistoryModalOpen(!isHistoryModalOpen);
        
        if (!isHistoryModalOpen) {
            // Cargar el historial solo si se abre el modal
            await loadTodayHistory();
            toggleHistoryVisibility(); // Cambiar aquí para llamar a toggleHistoryVisibility
        }
    };

    // Este efecto se ejecuta solo cuando `chatHistory` cambia, para actualizar el historial local
    useEffect(() => {
        if (chatHistory.length > 0) {
            setLocalChatHistory(chatHistory);
        }
    }, [chatHistory]);

    const handleSelection = (level) => {
        toggleMenuModal();
        let message = '';
        if (level === 'Basic') {
            message = 'I want to learn the basic shortcuts of NetBeans';
        } else if (level === 'Intermediate') {
            message = 'I want to learn the intermediate shortcuts of NetBeans';
        } else if (level === 'Advanced') {
            message = 'I want to learn the advanced shortcuts of NetBeans';
        }

        onSendMessage(message);
    };

    const formatTimestamp = (timestamp) => {
        return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
    };

    return (
        <div className='navbar'>
            <img className='menu' src={img1} onClick={toggleMenuModal} alt="menu" />
            <img className='logo' src={img2} alt="logo" />

            {isMenuModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <img className='menu' src={img1} onClick={toggleMenuModal} alt="menu" />
                        <h1 className='title-modal'>Shortcut List</h1>
                        <ul>
                            <li onClick={() => handleSelection('Basic')}>Basic</li>
                            <li onClick={() => handleSelection('Intermediate')}>Intermediate</li>
                            <li onClick={() => handleSelection('Advanced')}>Advanced</li>
                        </ul>
                        <div className='query_space'>
                            <h1 onClick={toggleHistoryModal} style={{ cursor: 'pointer' }} className='consultas'>
                                <span>Query</span><br /><span>History</span>
                            </h1>
                            <img className='query' src={img3} alt="query" />
                        </div>
                    </div>
                </div>
            )}

            {isHistoryModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <img className='back' src={img4} onClick={toggleHistoryModal} alt="back" />
                        <h1 className='query_modal'>Query History</h1>

                        <div className="history-container">
                            {localChatHistory.length === 0 ? (
                                <p className='no_query'>There are no queries registered today</p>
                            ) : (
                                <ul>
                                    {localChatHistory.map((entry, index) => (
                                        <li key={index}>
                                            <strong>{entry.role === 'user' ? 'Usuario' : 'Bot'}:</strong> {entry.content}
                                            <small className='fecha'>
                                                {'\n'}{'\n'}
                                                {entry.timestamp ? formatTimestamp(entry.timestamp) : 'Sin fecha'}
                                                {'\n'}
                                            </small>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;






