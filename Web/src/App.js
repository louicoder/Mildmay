import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

let socket;
function App () {
  const [ state, setState ] = React.useState({ name: '', room: '' });

  React.useEffect(() => {
    socket = io('localhost:8080');
    console.log(socket);

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
    // socket.emit('text', { name: 'louis' });
  }, []);

  const sendMsg = () => {
    const { name, room } = state;
    if (!name || !room) return alert('room and name are required');

    socket.emit('text', { name, room });
  };

  return (
    <div className="App">
      <div id="form">
        <input value={state.name} onChange={({ target: { value: name } }) => setState({ ...state, name })} />
        <input value={state.room} onChange={({ target: { value: room } }) => setState({ ...state, room })} />
        <button onClick={sendMsg}>Join</button>
      </div>
      <div>
        <input />
      </div>
    </div>
  );
}

export default App;
