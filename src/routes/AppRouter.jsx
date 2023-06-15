

import React, { useEffect, useContext } from "react";
import { Router, Switch, Route, useLocation, Redirect } from "wouter";
import PrincipalPage from "../pages/Admin/principal/PrincipalPage";
import Competencias from "../pages/Admin/competencias/Competencias";
import ErrorPage from "../pages/404/ErrorPage";
import SideBar from "../components/SideBar";
import Pruebas from "../pages/Admin/pruebas/Pruebas";
import Categorias from "../pages/Admin/categorias/Categorias";
import Preguntas from "../pages/Admin/preguntas/Preguntas";
import Estudiantes from "../pages/Admin/estudiantes/Estudiantes";
import Convocatorias from "../pages/Admin/convocatorias/Convocatorias";
import AgregarCompetencia from "../pages/Admin/competencias/AgregarCompetencia";
import AgregarCategoria from "../pages/Admin/categorias/AgregarCategoria";
import SeleccionarTipoPregunta from "../pages/Admin/preguntas/SeleccionarTipoPregunta";
import PreguntaSimple from "../pages/Admin/preguntas/PreguntaSimple";
import AgregarPrueba from "../pages/Admin/pruebas/AgregarPrueba";
import CambiarContrasenia from "../pages/Admin/principal/CambiarContrasenia";
import PreguntaImagen from "../pages/Admin/preguntas/PreguntaImagen";
import CambiarImagen from "../pages/Admin/principal/CambiarImagen";
import EditarInformacion from "../pages/Admin/principal/EditarInformación";
import EditarCompetencia from "../pages/Admin/competencias/EditarCompetencia";
import EditarCategoria from "../pages/Admin/categorias/EditarCategoria";
import Login from "../pages/Inicios/Login";
import { AppContext } from "../components/context/AppProvider";
import { Toaster } from "react-hot-toast";
import EditarPregunta from "../pages/Admin/preguntas/EditarPregunta";
import EditarEstudiante from "../pages/Admin/estudiantes/EditarEstudiante";
import AgregarConvocatoria from "../pages/Admin/convocatorias/AgregarConvocatoria";
import EditarConvocatoria from "../pages/Admin/convocatorias/EditarConvocatoria";
import EmailRecuperación from "../components/forms/EmailRecuperacion";
import NewPassword from "../components/forms/NewPassword";
export default function AppRouter() {
  const { token } = useContext(AppContext);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!token && location !== "/" && location !== "/recuperarEmail" && !location.includes("/newPassword")) {
      setLocation("/");
    }
    console.log(location)
  }, [token, location, setLocation]);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/home">
            {token ? (
              <>
                <SideBar />
                <PrincipalPage />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/competencias">
            {token ? (
              <>
                <SideBar />
                <Competencias />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/categorias">
            {token ? (
              <>
                <SideBar />
                <Categorias />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/pruebas">
            {token ? (
              <>
                <SideBar />
                <Pruebas />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/preguntas">
            {token ? (
              <>
                <SideBar />
                <Preguntas />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/estudiantes">
            {token ? (
              <>
                <SideBar />
                <Estudiantes />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/convocatorias">
            {token ? (
              <>
                <SideBar />
                <Convocatorias />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/formularioCompetencia">
            {token ? (
              <>
                <SideBar />
                <AgregarCompetencia />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/formularioCategoria">
            {token ? (
              <>
                <SideBar />
                <AgregarCategoria />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/tipoPregunta">
            {token ? (
              <>
                <SideBar />
                <SeleccionarTipoPregunta />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/formularioPreguntaSimple">
            {token ? (
              <>
                <SideBar />
                <PreguntaSimple />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/formularioPreguntaImagen">
            {token ? (
              <>
                <SideBar />
                <PreguntaImagen />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/formularioConvocatoria">
            {token ? (
              <>
                <SideBar />
                <AgregarConvocatoria />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/crearPrueba">
            {token ? (
              <>
                <SideBar />
                <AgregarPrueba />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/cambiarContrasenia">
            {token ? (
              <>
                <SideBar />
                <CambiarContrasenia />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/cambiarImagen">
            {token ? (
              <>
                <SideBar />
                <CambiarImagen />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/editarInformacion">
            {token ? (
              <>
                <SideBar />
                <EditarInformacion />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/editarCompetencia/:id">
            {token ? (
              <>
                <SideBar />
                <EditarCompetencia />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/editarCategoria/:id">
            {token ? (
              <>
                <SideBar />
                <EditarCategoria />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/editarPregunta/:id">
            {token ? (
              <>
                <SideBar />
                <EditarPregunta />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/editarEstudiante/:id">
            {token ? (
              <>
                <SideBar />
                <EditarEstudiante />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/editarPrueba/:id">
            {token ? (
              <>
                <SideBar />
                <EditarEstudiante />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/editarConvocatoria/:id">
            {token ? (
              <>
                <SideBar />
                <EditarConvocatoria />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/newPassword/:id/:token">
            {!token ? (
              <NewPassword/>
            ) : (
              <Redirect to="/home"/>
            )}
          </Route>
          <Route path="/">
            {token ? (
              <Redirect to="/home" />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/recuperarEmail">
            {!token ? (
              <EmailRecuperación/>
            ) : (
              <Redirect to="/home"/>
            )}
          </Route>
          <Route component={ErrorPage} />
        </Switch>
      </Router>
      <Toaster reverseOrder={true} />
    </>
  );
}
