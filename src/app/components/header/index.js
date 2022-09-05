import React, { useEffect } from "react";
import * as Material from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RoutePath } from "../../routes/route-path";
import {
  actionChangeTheme,
  actionInitThemeData,
} from "../../store/reducer/theme-reducer";

export default function Header(props) {
  const { isLogin } = useSelector((state) => state.rLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    initThemeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initThemeData = () => {
    dispatch(actionInitThemeData());
  };

  return (
    <>
      {isLogin && (
        <div className="div-header">
          <div>
            <Link aria-label="home" to={RoutePath.dashboard}>
              <Material.MdReorder size={30} color="#fff" />
            </Link>
            <Link aria-label="live-monitor" to={RoutePath.liveMonitory}>
              <Material.MdMonitor size={30} color="#fff" />
            </Link>
            <Link aria-label="entity-landing" to={RoutePath.entryLanding}>
              <Material.MdRouter size={30} color="#fff" />
            </Link>
          </div>
          <div>
            <Material.MdWbSunny
              onClick={(e) => {
                e.preventDefault();
                dispatch(actionChangeTheme());
              }}
              size={30}
              color="#fff"
              className="icon-cursor"
            />
            <Link aria-label="home" to={RoutePath.profile}>
              <Material.MdPerson
                className="icon-cursor"
                size={30}
                color="#fff"
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
