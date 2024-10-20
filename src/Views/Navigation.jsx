import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <img className='menu' src={img1}><Link to="/Menu"></Link></img>
      <img className='logo' src={img2}></img>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Menu">Menu</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
