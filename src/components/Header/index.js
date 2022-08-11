import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Nav } from './styles';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const dispatch = useDispatch();
  const sizeIcons = 24;
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push('/');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={sizeIcons} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={sizeIcons} />
      </Link>

      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaPowerOff size={sizeIcons} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={sizeIcons} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={sizeIcons} color="lightgreen" />}
    </Nav>
  );
}
